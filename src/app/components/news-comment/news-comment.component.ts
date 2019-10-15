import { Router } from '@angular/router';
import { UserListComponent } from './../user-list/user-list.component';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment} from '../../core/model/comment.model';
import {News} from '../../core/model/news-model';
import {HttpMidlUtilService} from '../../httpWrapperModule/http_midl_util.service';
import {StorageService} from '../../core/storage-service.service';
import {ObjectMediaTypeList, UrlResponseCodes, MessagesConstants} from '../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'underscore';
import {User} from '../../core/model/user.model';
import {ShareDataSubscriptionService} from '../common/sharedata-subscription.service';
import {UserMentionData} from '../../core/model/userMentionResponse';
import {HashTagData} from '../../core/model/userTaggingResponse.model';
import {HttpUserUtilsService} from '../../httpWrapperModule/http_user_util.service';
import {UtitlityService} from '../../core/utils.service';
import {DomSanitizer} from '@angular/platform-browser';
import { BaseComponentComponent } from '../base-component/base-component.component';
import Debounce from 'debounce-decorator'

declare var $: any;

@Component({
    selector: 'app-news-comment',
    templateUrl: './news-comment.component.html',
    styleUrls: ['./news-comment.component.scss']
})
export class NewsCommentComponent extends BaseComponentComponent implements OnInit {
    public newsMediaType: string='';
    imageFileList: any[] = [];
    public commentSizeDefault = 25;
    public pageDefault = 0;
    public scroll = false;
    public newsAction: News;
    public commentList: Comment[];
    public loggedInUserData: User;
    public newsCommentText: string;
    public objectMediaTypesList = ObjectMediaTypeList.objectMediaTypesListDocument;
    public isLoadPreviousComment = false;
    public activeCarouselDefault = 0;
    private fileExtension;
    public allowedExtensions =
       ["jpg","jpeg","png","JPG","JPEG","JFIF","BMP","SVG","PNG"];
    public commentRequestObject: object = {
        newsId: 0,
        page: 0,
        size: 0,
    };
    public commentForm: FormGroup;
    @ViewChild('fileInputImage') fileInputImage: ElementRef;

    public userMentionList: UserMentionData[] = [];
    public hashTagDataList: HashTagData[] = [];
    public mentionedUserList: any[] = [];
    public queryMention: string = '';
    public querytag: string = '';
    public pattern = /\B@[a-z0-9_-]+/gi;
    public patternHashTag = /\B#[a-z0-9_-]+/gi;
    public pattern1 = /\B@/gi;
    public patternHashTag1 = /\B#/gi;


    constructor(private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private httpMidlUtilService: HttpMidlUtilService,
        private formbuilder: FormBuilder,
        public sanitizer: DomSanitizer,
        private sharedDataNewsAction: ShareDataSubscriptionService,
        private httpUserUtilsService: HttpUserUtilsService,
        private router: Router) {
        super();
    }

    ngOnInit() {
        this.commentForm = this.formbuilder.group({
            'newsCommentText': ['', Validators.required],

        });
        this.loggedInUserData = StorageService.getUser();

        this.getNewsCommentData(this.newsAction.virtualNewsId, this.pageDefault, this.commentSizeDefault);
        if(this.newsAction.media &&this.newsAction.media.length>0){
            this.newsMediaType=this.newsAction.media[0].mediaType;
          }

    }

    ngAfterViewChecked() {
        if(this.scroll){
            this.scrollToView('forScroll');
            this.scroll = false;
        };
    }

    scrollToView(id: string) {
        let element = document.getElementById(id);
        element.scrollIntoView();


    }



    onSuccess(type: any, responseData: any, successId: number) {
        switch (type) {
            case UrlResponseCodes.getNewsCommentListCode:
                if (responseData && responseData.length === this.commentSizeDefault) {
                    this.isLoadPreviousComment = true;
                    this.pageDefault = this.pageDefault + 1;
                } else {
                    this.isLoadPreviousComment = false;
                }
                if (this.commentList && this.commentList.length > 0) {
                    const tempCommentList = this.commentList;
                    this.commentList = responseData;
                    responseData = tempCommentList;
                    this.commentList.push.apply(this.commentList, responseData);
                } else {
                    this.commentList = responseData;
                }
                if(this.commentList.length)this.scroll = true;


                break;
            case UrlResponseCodes.postNewsCommentCode:
                this.imageFileList = [];
                this.commentList.push(responseData);
                this.commentForm.reset();
                this.newsAction.commentCount = this.newsAction.commentCount + 1;
                this.newsAction.isCommented = true;
                this.sharedDataNewsAction.newsDataChange(this.newsAction);
                this.scroll = true;
                break;
            case UrlResponseCodes.newsCommentDeleteCode:
                this.commentList = _.without(this.commentList, _.findWhere(this.commentList, {
                    id: successId
                }));
                this.newsAction.commentCount = this.newsAction.commentCount - 1;
                this.newsAction.isCommented = this.getIsComment(this.commentList);
                this.getIsComment(this.commentList);
                this.sharedDataNewsAction.newsDataChange(this.newsAction);
                break;
            case UrlResponseCodes.userMentionResponseCode:

                this.userMentionList = responseData;
                if (this.userMentionList && this.userMentionList.length > 0) {
                    $('.exploreMentionComent').slideDown('slow');

                } else {
                    $('.exploreMentionComent').slideUp('slow');

                }

                break;
            case UrlResponseCodes.userTaggingResponseCode:
                this.hashTagDataList = responseData;
                if (this.hashTagDataList && this.hashTagDataList.length > 0) {
                    $('.exploreTagComent').slideDown('slow');

                } else {
                    $('.exploreTagComent').slideUp('slow');

                }
                break;
        }


    }

    onFailure(type: any, response: string) {
        switch (type) {
            case UrlResponseCodes.userMentionResponseCode:
                $('.exploreMentionComent').slideUp('slow');

                break;
            case UrlResponseCodes.userTaggingResponseCode:
                $('.exploreTagComent').slideUp('slow');

                break;
            default:

                this.showAlertMessage("Error", "", response, 4000);
                break
        }

    }
    showAlertMessage(type, status, message, erroTime?: any) {
        this.sharedDataNewsAction.show(type, status, message, erroTime);
    }
    loadPreviousComment() {
        this.getNewsCommentData(this.newsAction.virtualNewsId, this.pageDefault, this.commentSizeDefault);

    }

    getNewsCommentData(virtualNewsId: number, page: number, commentSize: number) {
        this.commentRequestObject['newsId'] = virtualNewsId;
        this.commentRequestObject['page'] = page;
        this.commentRequestObject['size'] = commentSize;
        this.httpMidlUtilService.getNewsCommentData(this.commentRequestObject, this, true);
    }

    postNewsComment(virtualNewsId: number) {
        if (this.imageFileList && this.imageFileList.length > 0) {
            this.fileExtension = this.imageFileList[0].fileObject['name'].split('.').pop();
            if(this.allowedExtensions.indexOf(this.fileExtension) == -1){
                alert("Only photos allowed!!");
                return  false;
            }


        }
        if ((this.commentForm.valid && $.trim(this.commentForm.value.newsCommentText) != '') || (this.imageFileList && this.imageFileList.length > 0)) {
            let list = this.commentForm.value.newsCommentText== null? null :this.commentForm.value.newsCommentText.match(this.pattern);
            if (list && list.length > 0) {
                list.forEach(element => {
                    let mentionedObject = _.find(this.mentionedUserList, function(mentionObject, index) {
                        if (mentionObject.mentionString === element) {
                            return true;
                        }
                    });
                    if (mentionedObject) {
                        let encodedTaggingString = UtitlityService.encodeUserTaggingString(mentionedObject.mentionObject);
                        this.commentForm.value.newsCommentText.replace(element, encodedTaggingString);
                    }
                });
            }
            else if(this.commentForm.value.newsCommentText == null ){
                this.commentForm.value.newsCommentText = '';
            }
            const npcRequestFormData = new FormData();
            npcRequestFormData.append('userId', StorageService.getUserId().toString());
            npcRequestFormData.append('virtualNewsId', virtualNewsId.toString());
            npcRequestFormData.append('newsCommentText', this.commentForm.value.newsCommentText.trim());
            if (this.imageFileList && this.imageFileList.length > 0) {
                npcRequestFormData.append('image', this.imageFileList[0].fileObject);
            }
            this.httpMidlUtilService.postNewsComment(npcRequestFormData, this, true);


        }
        else {
            this.showAlertMessage("Error", "", 'image or text are required', 4000);
            return false
        }
    }

    deleteNewsComment(id: number) {
        this.httpMidlUtilService.deleteNewsComment(id, this, true);

    }

    public addActiveClass(i: number) {
        this.activeCarouselDefault = i;
    }

    private getIsComment(commentList: Comment[]) {
        let isCommented: boolean = false;
        const comment = _.find(commentList, { 'userId': StorageService.getUserId() });
        if (comment) {
            isCommented = true;
        }
        return isCommented;

    }

    fileChangeEvent(inputFile: any) {
        this.removeNewsCommentMedia();
        for (let i = 0; i < inputFile.target.files.length; i++) {
            this.imagePreviewList(inputFile.target.files[i]);
        }
        this.fileInputImage.nativeElement.value = null;

    }

    imagePreviewList(file: File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.imageFileList.push({ 'fileUrl': reader.result, 'fileObject': file })

        }
    }

    removeNewsCommentMedia() {
        this.imageFileList = [];
    }

    @Debounce(250)
    tAGGING(event) {
        this.mentionUsers(event)
        this.addHashTag(event);
    }

    //********************************************User Mention and Tagging ***********************************  */
    userSelectedForMention(user: UserMentionData) {
        this.commentForm.controls['newsCommentText'].setValue(this.replaceLast(this.commentForm.value.newsCommentText, this.queryMention, user.username));
        this.mentionedUserList.push({ mentionString: '@' + user.username, mentionObject: user });
        $('.exploreMentionComent').slideUp('slow');

    }

    userSelectedForTag(user: HashTagData) {
        this.commentForm.controls['newsCommentText'].setValue(this.replaceLast(this.commentForm.value.newsCommentText, this.querytag, user.name));
        $('.exploreTagComent').slideUp('slow');
    }

    mentionUsers1(event) {
        let myString = event.target.value;
        let list = myString.match(this.pattern);
if (list) {
            let lastMention = list[list.length - 1]
            let indexOfmention = myString.lastIndexOf(lastMention)
            let indexOflastSpace = myString.lastIndexOf(' ');
            let dataIndex;

            let lastCharOfpattern = lastMention.substr(lastMention.length - 1);
            let lastCharOfMyString = myString.substr(myString.length - 1);
            this.queryMention = lastMention.substr(1);
            this.mentionedUserList.forEach(element => {
                if (list.indexOf(element.mentionString) == -1) {
                    this.mentionedUserList.splice(this.mentionedUserList.indexOf(element), 1);
                }

            });

            if (lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace) {
                this.httpUserUtilsService.userMention(this.queryMention, 0, this, true);
            } else {
                $('.exploreMentionComent').slideUp('slow');

            }
        } else {
            this.mentionedUserList = [];
            $('.exploreMentionComent').slideUp('slow');

        }
    }
    mentionUsers(event) {
        let myString = event.target.value;
        var cursorPosition = $('#newsCommentText').prop("selectionStart");
        myString = myString.substring(0,cursorPosition);
        let list = myString.match(this.pattern);
        let list1 = myString.match(this.pattern1);

        if (list && list.length==list1.length) {
          let lastMention = list[list.length - 1]
          let indexOfmention = myString.lastIndexOf(lastMention)
          let indexOflastSpace = myString.lastIndexOf(' ');
          let dataIndex;

          let lastCharOfpattern = lastMention.substr(lastMention.length - 1);
          let lastCharOfMyString = myString.substr(myString.length - 1);
          this.queryMention = lastMention.substr(1);
          this.mentionedUserList.forEach(element => {
            if (list.indexOf(element.mentionString) == -1) {
              this.mentionedUserList.splice(this.mentionedUserList.indexOf(element), 1);
            }

          });
          if(lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace){

            this.httpUserUtilsService.userMention(this.queryMention,0,this,true);
          }else{
            $('.exploreMentionComent').slideUp('slow');

          }
          return;
        } 
        if(list1) {
            let lastMention = list1[list1.length - 1]
            let indexOfmention = myString.lastIndexOf(lastMention)
            let indexOflastSpace = myString.lastIndexOf(' ');
            let dataIndex;
  
            let lastCharOfpattern = lastMention.substr(lastMention.length - 1);
            let lastCharOfMyString = myString.substr(myString.length - 1);
            this.queryMention = lastMention.substr(1);
            this.mentionedUserList.forEach(element => {
              if (list1.indexOf(element.mentionString) == -1) {
                this.mentionedUserList.splice(this.mentionedUserList.indexOf(element), 1);
              }
  
            });
            if(lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace){
  
              this.httpUserUtilsService.userMention(this.queryMention,0,this,true);
            }else{
              $('.exploreMentionComent').slideUp('slow');
  
            }
          }
        else {
          this.mentionedUserList = [];
          $('.exploreMentionComent').slideUp('slow');

        }
       }

    addHashTag(event) {
        let myString = event.target.value;
        var cursorPosition = $('#newsCommentText').prop("selectionStart");
        myString = myString.substring(0,cursorPosition);
        let list = myString.match(this.patternHashTag);
        let list1 = myString.match(this.patternHashTag1);
        if (list && list.length==list1.length) {
            let lastMention = list[list.length - 1]
            let indexOfmention = myString.lastIndexOf(lastMention)
            let indexOflastSpace = myString.lastIndexOf(' ');

            let lastCharOfpattern = lastMention.substr(lastMention.length - 1);
            let lastCharOfMyString = myString.substr(myString.length - 1);
            this.querytag = lastMention.substr(1);
            if (lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace) {
                this.httpUserUtilsService.userHashTag(this.querytag, 0, this, true);
            } else {
                $('.exploreTagComent').slideUp('slow');

            }
            return;

        }
        if (list1) {
            let lastMention = list1[list1.length - 1];
            let indexOfmention = myString.lastIndexOf(lastMention);
            let indexOflastSpace = myString.lastIndexOf(' ');

            let lastCharOfpattern = lastMention.substr(lastMention.length - 1);
            let lastCharOfMyString = myString.substr(myString.length - 1);
            this.querytag = lastMention.substr(1);
            if (lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace) {
                this.httpUserUtilsService.userHashTag(this.querytag, 0, this, true);
            } else {
                $('.exploreTagComent').slideUp('slow');

            }
        }
        else{
            $('.exploreTagComent').slideUp('slow');

        }
    }

    public replyToUser(user: any) {
        if( this.commentForm.value.newsCommentText == null || !(this.commentForm.value.newsCommentText.indexOf(user.username) >-1)){
            this.commentForm.value.newsCommentText = '';
            if(user.username.indexOf("@") == -1){
                user.username = '@'+user.username +' ' ;
            }

            this.userSelectedForMention(user);
        }
    }

    // replaceLast(x, y, z) {
    //     var a = x.split('');
    //     a[x.lastIndexOf(y)] = z;
    //     return a.join('');
    // }

    replaceLast1(x, y, z) {
        var a = x.split('');
        a[x.lastIndexOf(y)] = z;
        var new_arr = a.splice(0,x.lastIndexOf(y)+1);
        new_arr =  new_arr.join('')+ ' ';
        return new_arr;
    }
    replaceLast(x, y, z) {
        var cursorPosition = $('#newsCommentText').prop("selectionStart");
        var a1=x.substring(0,cursorPosition);
        var a2=x.substring(cursorPosition);
        let lastIndex= a1.lastIndexOf(y);
        return a1.substring(0,lastIndex)+z+" "+a2;
      }
    openViewsUserListPopup(virtualNewsId: number) {
        const modalRef = UtitlityService.openModal(this.modalService, UserListComponent);
        modalRef.componentInstance.listFor = 'newsViewsUserList';
        modalRef.componentInstance.virtualNewsId = virtualNewsId;
        modalRef.componentInstance.listTitile = MessagesConstants.viewUserList;
        modalRef.componentInstance.parent = this;
      }

      openLikesUserListPopup(virtualNewsId: number) {
        const modalRef = UtitlityService.openModal(this.modalService, UserListComponent);
        modalRef.componentInstance.listFor = 'newsLikesUserList';
        modalRef.componentInstance.virtualNewsId = virtualNewsId;
        modalRef.componentInstance.listTitile = MessagesConstants.LikeUserList;
        modalRef.componentInstance.parent = this;

      }

      routeUser(event, news?: any) {
        let target = event.target || event.srcElement;
        if (target.id.indexOf('myumention') > -1) {
            this.activeModal.close('Close click');
            const mentionid = target.id.split('_')
           UtitlityService.redirectUser(this.router, 'user', mentionid[1])

        } else if (target.id.indexOf('myuhash') > -1) {
            this.activeModal.close('Close click');
            const hashid = target.id.split('_')
          UtitlityService.redirectUser(this.router, 'newsfeed', hashid[1])
        }

      }
      route(route,id){
    this.activeModal.close('Close click');
    UtitlityService.redirectUser(this.router,route, id);
}
}
