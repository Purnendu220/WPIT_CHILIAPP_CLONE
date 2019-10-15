import {concat} from 'rxjs/observable/concat';
import {UrlResponseCodes, Constants, MessagesConstants} from './../../core/constants';
import {element} from 'protractor';
import {HttpSuccesFailureResponse} from './../../httpWrapperModule/http_wrapper_response.intreface';
import {Component, OnInit, Input, ViewChild, ElementRef, NgZone} from '@angular/core';
import {AppLogger} from '../../core/logger';
import {HttpUserUtilsService} from '../../httpWrapperModule/http_user_util.service';
import {SearchBoardMediaData, Media} from '../../core/model/searchBoardMedia';
import {UtitlityService} from '../../core/utils.service';
import * as RecordRTC from 'recordrtc';
import {SelectBoardListComponent} from './select-board-list/select-board-list.component';
import {WebCamComponent} from 'ack-angular-webcam';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShareDataSubscriptionService} from '../common/sharedata-subscription.service';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonConfirmationPopupComponent} from '../../core/common-confirmation-popup/common-confirmation-popup.component';
import {UserMentionData} from '../../core/model/userMentionResponse';

declare var $: any;
declare var Dropbox: any;
declare var gapi: any;
declare var google: any;
declare var p5: any;
declare var videojs: any;
declare var RecordRTC:any;
declare var StereoAudioRecorder:any;
import * as _ from 'underscore';
import {HashTagData} from '../../core/model/userTaggingResponse.model';
import { release } from 'os';
import { BaseComponentComponent } from '../base-component/base-component.component';
import Debounce from 'debounce-decorator'


declare var WebAudioRecorder: any;


@Component({
  selector: 'appcreatepost',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
// tslint:disable-next-line:max-line-length
export class CreatePostComponent  extends BaseComponentComponent implements OnInit, HttpSuccesFailureResponse {
  ngAfterViewInit() {
    $(document).mouseup(function (e) {
      var container = $(".exploreMention");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.slideUp('slow');
      }
    });


    //Record Audio File Start
    let that = this;
    var mic, recorder, soundFile, isrecordingstoped = false, recordTimer, progress = -1;

//***********************************************************Google And DropBox Picker****************************** */

    var options = {
      success: function (files) {
        alert("Here's the file link: " + files[0].link)
      },
      cancel: function () {
      },
      linkType: "direct",
      multiselect: false, // or true
      extensions: ['.pdf', '.doc', '.docx'],
      folderselect: false, // or true
    };
    $("#fromDropBox").click(function () {
      Dropbox.choose(options);
    });
    $("#googleDrive").click(function () {
      onApiLoad();
    });
    var clientSecrete = 'u1Gt5zPoti6YAaYOSqvMbn0q';
    var developerKey = 'AIzaSyDrh02wGKpo9v4531l5fwUs0jUcXP2bwLk';
    var clientId = "1046790321040ahgu6v65liql13hhfe877bmke4i9do4f.apps.googleusercontent.com";
    var scope = ['https://www.googleapis.com/auth/drive.file'];
    var pickerApiLoaded = false;
    var oauthToken;

    // Use the API Loader script to load google.picker and gapi.auth.
    function onApiLoad() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      gapi.auth.authorize(
        {
          'client_id': clientId,
          'scope': scope,
          'immediate': false
        },
        handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        console.log(authResult);
        oauthToken = authResult.access_token;
        createPicker();
      }
      else {
        console.log("fail hdshfjjfj");

      }
    }

    // Create and render a Picker object for picking user Photos.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var picker = new google.picker.PickerBuilder().addViewGroup(
          new google.picker.ViewGroup(google.picker.ViewId.DOCS).addView(google.picker.ViewId.DOCUMENTS).addView(google.picker.ViewId.PRESENTATIONS)).setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
        picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      var url = 'nothing';
      var name = 'nothing';
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
        name = doc.name;
        var param = {'fileId': doc.id, 'oAuthToken': oauthToken, 'name': name}
        console.log(param);
        document.getElementById('result').innerHTML = "Downloading...";
        $.post('download.php', param,
          function (returnedData) {
            document.getElementById('result').innerHTML = "Download completed";
          });


      }

    }

//***********************************************************Google And DropBox Picker****************************** */

//********************************* DRAG DROP **************************************************************** */
    var count = 0;
    $('#holder').on({
      'dragover dragenter': function (e) {
        console.log("dragenter___________hhhhh");
        count++
        that.showOnDragEvent = true;
        e.preventDefault();
        e.stopPropagation();
      },
      'dragleave': function (e) {
        let count_temp = count;
        setTimeout(function () {
          if (count_temp == count) {
            console.log("dragleave___________jahhsfhkj " + count_temp + "________" + count);
            that.showOnDragEvent = false;

          }

        }, 1000);

        e.preventDefault();
        e.stopPropagation();

      },
      'drop': function (e) {
        console.log("drop " + e);
        that.showOnDragEvent = false;

        var dataTransfer = e.originalEvent.dataTransfer;
        if (dataTransfer && dataTransfer.files.length) {
          e.preventDefault();
          e.stopPropagation();
          let errorObject = validateSelectedFiles(dataTransfer);
          if (!errorObject.isError) {
            that.onFileSelected(dataTransfer.files);
          }
          else {
            that.showAlertMessage("Success", "", errorObject.errorMessage, 5000);
          }


        }
      }
    });

    function validateSelectedFiles(dataTransfer) {
      let imageTypeList = [];
      let videoTypeList = [];
      let documentTypeList = [];
      let errorObject = {isError: false, errorMessage: ''};
      $.each(dataTransfer.files, function (i, file) {
        if (file.type.indexOf('image') > -1) {
          imageTypeList.push('image')
        }
        if (file.type.indexOf('video') > -1 || file.name.indexOf('.mkv') > -1) {
          videoTypeList.push('video')
        }
        if (file.name.indexOf('.pdf') > -1 || file.name.indexOf('.doc') > -1 || file.name.indexOf('.docx') > -1
          || file.name.indexOf('.xls') > -1 || file.name.indexOf('.xlsx') > -1 || file.name.indexOf('.ppt') > -1 || file.name.indexOf('.pptx') > -1) {
          documentTypeList.push('doc')
        }
      });
      if (imageTypeList.length > 0 && videoTypeList.length > 0 && documentTypeList.length > 0) {
        errorObject = {isError: true, errorMessage: "You can't post image video and document in single post "};
      }
      else if (imageTypeList.length > 0 && videoTypeList.length > 0) {
        errorObject = {isError: true, errorMessage: "You can't post image and video  in single post "};

      }
      else if (videoTypeList.length > 0 && documentTypeList.length > 0) {
        errorObject = {isError: true, errorMessage: "You can't post document and video  in single post "};

      }
      else if (imageTypeList.length > 0 && documentTypeList.length > 0) {
        errorObject = {isError: true, errorMessage: "You can't post image and document  in single post "};

      }
      else if (documentTypeList.length > 1) {
        errorObject = {isError: true, errorMessage: "You can't post more than 1 document  in single post "};

      }
      else if (videoTypeList.length > 1) {
        errorObject = {isError: true, errorMessage: "You can't post more than 1 video  in single post "};

      }
      return errorObject;
    }

//********************************* DRAG DROP **************************************************************** */

//********************************* VIDEO RECORD **************************************************************** */
if(that.notSupportedError =='none'){
  resetVideoRecord();
    $("#rec_cam").click(function () {
      resetVideoRecord();
      releasemedia();
      clearInterval(recordTimer);
    });
    $("#rec_video").click(function () {
      resetVideoRecord();
    });
    $("#rec_file").click(function () {
      resetVideoRecord();
      releasemedia();
      clearInterval(recordTimer);
    });
    $("#close_capture").click(function () {
      that.retakePicture();
      that.showHide=false;
      resetVideoRecord();
      releasemedia();
      clearInterval(recordTimer);


    });
    $("#add_video_to_post").click(function () {
      if (that.capturedObjcet) {
        that.addVideoToList();
        resetVideoRecord();

      }



    });
    $("#start_video_rec").click(function () {
      startVideoRecording();
    });
    $("#stop_video_rec").click(function () {
      if(that.state !=2){
        stopVideoRecording();

      }
    });
  }
  function initVideoPlayer() {
    let video:HTMLVideoElement = that.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
}
function resetVideoRecord(){
  progress=-1;
  that.recordTime='Start';
  that.state = 0;
  let video: HTMLVideoElement = that.video.nativeElement;
  video.src = "";
  that.capturedObjcet=null;
  recordRTC=null;
  initVideoPlayer();
}
function startVideoRecording() {
  if(recordRTC&&recordRTC.state ==='recording'){
    that.showAlertMessage('Error','','Recoding already started',4000);
     }else{
        var mediaConstraints = { video: true, audio: true };
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(successVideoCallback).catch(errorVideoCallback);
   }
  }
function toggleControls() {
  let video: HTMLVideoElement = that.video.nativeElement;
  video.muted = !video.muted;
  video.controls = !video.controls;
  video.autoplay = !video.autoplay;
}

function successVideoCallback(stream: MediaStream) {
  var options = {    type: 'video' ,
  mimeType: 'video/webm'};
  stream = stream;
  recordRTC = RecordRTC(stream, options);
  recordRTC.reset();
  recordRTC.setRecordingDuration(that.audioVideoLimit*1000).onRecordingStopped(function() {
  toggleControls();
  let video: HTMLVideoElement = that.video.nativeElement;
  recordedBlob = recordRTC.getBlob();
  that.createCaptureObject(recordedBlob)
  recordRTC.getDataURL(function(dataURL) { video.src = dataURL;});
  recordRTC.clearRecordedData();
  releasemedia();
    that.state = 2;
  clearInterval(recordTimer);
  $("#stop_video_rec").click();
});
  recordRTC.startRecording();
  let video: HTMLVideoElement = that.video.nativeElement;
  video.src = window.URL.createObjectURL(stream);
  toggleControls();
  setTimeout(() => {
    that.state = 1;
   }, 1000);
  //that.state = 1;
  progress=-1;
  that.recordTime='Start';
  microphone=stream;
  startAudioTime();
}

function errorVideoCallback(error) {
alert(error);}
function stopVideoRecording() {
  that.state = 2;
  clearInterval(recordTimer);
  toggleControls();
  recordRTC.stopRecording(function(audioVideoWebMURL) {
    let video: HTMLVideoElement = that.video.nativeElement;
    video.src = audioVideoWebMURL;
    recordedBlob = recordRTC.getBlob();
    that.createCaptureObject(recordedBlob)
    recordRTC.getDataURL(function(dataURL) { });
    recordRTC.clearRecordedData();
    releasemedia();

  });


  }



//********************************* VIDEO RECORD **************************************************************** */

//***************************************AUDIO SECTION  ****************************************************/

var recordRTC;
var recordedBlob,microphone;

function resetAudioRecord(){
  progress=-1;
  that.recordTime='Start';
  that.state = 0;
  var obj=document.getElementById('rec_auio')
    $(obj).attr('src', "");
    clearInterval(recordTimer);
    recordRTC=null;

}
function successCallback(stream) {
  var options = {
    type: 'audio' ,
    recorderType: StereoAudioRecorder,
    mimeType: 'audio/webm' // Firefox also supports: "audio/ogg"
};
  recordRTC = RecordRTC(stream,options);
  recordRTC.reset();
  recordRTC.startRecording();
  recordRTC.setRecordingDuration(that.audioVideoLimit*1000).onRecordingStopped(function() {
    document.getElementById("stop").click(); });
    setTimeout(() => {
      that.state = 1;
     }, 1000);
  progress=-1;
  that.recordTime='Start';
  microphone=stream;
  startAudioTime();

}

function errorCallback(error) {
  alert(error);
}
$("#start").click(function () {
  if(recordRTC&&recordRTC.state ==='recording'){
    that.showAlertMessage('Error','','Recoding already started',4000);
     }else{
  resetAudioRecord();
  var mediaConstraints = { video: false, audio: true };
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}
  });
$("#stop").click(function () {
stopRecording();

});
function stopRecording(){
    that.state = 2;
    clearInterval(recordTimer);
    recordRTC.stopRecording(function(audioURL) {
    var obj=document.getElementById('rec_auio')
    $(obj).attr('src', audioURL);
    recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function(dataURL) { });
    recordRTC.clearRecordedData();
    releasemedia();
    that.recordTime='Start';

  });

}

function releasemedia(){
  try{
    var mediaStream = null;
    mediaStream = microphone;
    microphone.getTracks().forEach( (track) => {
      track.stop();
      });

  }catch(e){}


}
    function startAudioTime() {
      recordTimer = setInterval(function () {
        progress++;
        that.recordTime=fromSecondsToMinutes(progress);

      }, 1000);
    }

    function addRecordedAudio() {
      that.state = 0;
      that.removeOtherFilesFromListForAudio();
      that.audioFileList.push({length: progress, fileBlob: recordedBlob,fileURL:window.URL.createObjectURL(recordedBlob)})
    }

    $("#recordAudio").click(function () {
      if(that.state == 1){
        stopRecording();}
      resetAudioRecord();
    });
    $("#addAudio").click(function () {
      addRecordedAudio();
      collapseDiv();
    });
    $("#close_audioRecs").click(function () {
      if(that.state == 1){
        stopRecording();
       }
      resetAudioRecord();
      collapseDiv();
    });
    $('#audioRecs').on('shown.bs.collapse', function () {
      that.activeCaptureButton = false;

    });
    $('#audioRecs').on('hidden.bs.collapse', function () {
      that.activeCaptureButton = true;
    });
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

    function collapseDiv() {
      $(".collapse").collapse('hide');
      that.activeCaptureButton = false;

    }

    function fromSecondsToMinutes(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }
  }

  createCaptureObject(blob) {
    let url = window.URL.createObjectURL(blob);
    this.capturedObjcet = {fileUrl: url, fileBlob: blob}

  }

  public newsPostId: any;

  public recordTime: string = 'Start';
  public mediaNotSupported: boolean = false;
  public isMediaAllowed: boolean = false;
  public state = 0;
  public totalResponseReceived = [];

  @ViewChild("fileInputImage") fileInputImage: ElementRef;
  @ViewChild("fileInputVideo") fileInputVideo: ElementRef;
  @ViewChild("fileInputFile") fileInputFile: ElementRef;


  @Input() userData: any;

  private mediaRecorder: any;
  private chunks: any = [];
  public isRecording: boolean = false;
  public boardmediaList: SearchBoardMediaData[] = [];
  public recentlyUploadedMediaList: Media[] = [];

  public recentUploadedMediaSelected: Media[] = [];
  public capturedMedialist: any[] = [];
  public capturedVideoList: any[] = [];
  public imageFileList: any[] = [];
  public audioFileList: any[] = [];
  public otherFileList: any[] = [];
  public videoFileList: any[] = [];
  public newsText: string = '';
  public selectBoardListComponent: any;
  public subscription: any;
  public isPublish: boolean = true;
  public webcam: WebCamComponent;
  public captureImage: String = '';
  public showHide: boolean = false;
  public errorMessage = '';

  @ViewChild('video') video: any;
  private stream: MediaStream;
  private recordRTC: any;
  public capturedObjcet: any;
  public userMentionList: UserMentionData[] = [];
  public hashTagDataList: HashTagData[] = [];
  public mentionedUserList: any[] = [];
  public queryMention: string = '';
  public querytag: string = '';
  public pattern = /\B@[a-z0-9_-]+/gi;
  public pattern1 = /\B@/gi;
  public patternHashTag = /\B#[a-z0-9_-]+/gi;
  public patternHashTag1 = /\B#/gi;

  public isPremiumUser: boolean = false;
  public imageLimit: number = 4;
  public audioVideoLimit: number = 60;
  public activeCaptureButton: boolean = true;
  public showOnDragEvent: boolean = false;
  public userAgent=window.navigator.userAgent;
  public notSupportedError:string ='none';
 public notSupportedErrorMessage:string=MessagesConstants.featureNotSupportedError;
 public diablePostButton=false;

  constructor(private _ngZone: NgZone,
              private httpUserUtilsService: HttpUserUtilsService,
              private modalService: NgbModal,
              private shareDataSubscriptionService: ShareDataSubscriptionService,
              private sanitizer: DomSanitizer) {
    super();
  }

//************************************************Image Capture From Cam **********************************************/
  getCaptureImage() {
    if (this.capturedMedialist.length + this.imageFileList.length < this.imageLimit) {
      this.webcam.getBase64()
        .then(picture =>
          this.captureImage = picture)
        .catch(e => console.error(e))


    } else {
      this.showAlertMessage("Error", "", MessagesConstants.imageLimit + this.imageLimit + MessagesConstants.images, 4000)
    }

  }

  createCaptureMediaList(picture) {
    if (picture) {
      this.videoFileList.splice(0, this.videoFileList.length);
      this.capturedVideoList.splice(0, this.capturedVideoList.length);
      this.otherFileList.splice(0, this.otherFileList.length);
      this.recentUploadedMediaSelected.splice(0, this.recentUploadedMediaSelected.length);
      this.showHide = false;
      this.captureImage = picture;
      let blobObject = UtitlityService.base64ToFile(picture, new Date().getMilliseconds() + '.png', 'image/png');
      this.capturedMedialist.push({fileUrl: window.URL.createObjectURL(blobObject), fileBlob: blobObject});
      this.retakePicture();
      this.closeOpenedModal('#TakeaPhoto');
    } else {
      //this.showAlertMessage("Error", "", MessagesConstants.captureBeforeSelect, 4000)

    }
  }

  retakePicture() {
    this.captureImage = '';
  }
  onCamError(err){

    this.alertOnDeviceError(err);

  }

  onCamSuccess() {

  }

//************************************************Image Capture From Cam **********************************************/

  ngOnInit() {
    this.httpUserUtilsService.searchExistingFile(this, false);

    this.subscription = this.shareDataSubscriptionService.newsPost
      .subscribe((value) => {

        this.newsText;
        this.postNews(value);
      });
    this.isPremiumUser = this.userData.isPremiumUser;
    if (this.isPremiumUser) {
      this.imageLimit = 8;
      this.audioVideoLimit = 120;
    }

    if(this.userAgent.toLowerCase().indexOf('trident')>-1){
          this.notSupportedError='ie';
         }
     if(this.userAgent.toLowerCase().indexOf('edge')>-1){
          this.notSupportedError='edge';
         }
         if(this.userAgent.toLowerCase().indexOf('safari')>-1&&this.userAgent.toLowerCase().indexOf('chrome')==-1){
          this.notSupportedError='safari';
         }

    $(document).mouseup(function (e) {
      var container = $('.exploreMentionComent,.exploreTagComent,.exploreTag ');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.slideUp('slow');
      }
    });
  }


//************************************************Select File Form Computer **********************************************/

  fileChangeEvent(inputFile: any) {
    $('#attachments').modal('hide');
    this.onFileSelected(inputFile.target.files);
    this.fileInputImage.nativeElement.value = null;
    this.fileInputFile.nativeElement.value = null;
    this.fileInputVideo.nativeElement.value = null;


  }

  onFileSelected(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf('image') > -1) {
        if (this.capturedMedialist.length + this.imageFileList.length < this.imageLimit) {
          this.videoFileList.splice(0, this.videoFileList.length);
          this.capturedVideoList.splice(0, this.capturedVideoList.length);
          this.otherFileList.splice(0, this.otherFileList.length);
          this.recentUploadedMediaSelected.splice(0, this.recentUploadedMediaSelected.length);
          this.imagePreviewList(files[i]);
        } else {

          this.showAlertMessage("Error", "", MessagesConstants.imageLimit + this.imageLimit + MessagesConstants.images, 4000)
        }
      }
      if (files[i].type.indexOf('video') > -1 || files[i].name.indexOf('.mkv') > -1) {
        this.videoPreviewList(files[i]);
        break;
      }

      if (files[i].name.indexOf('.pdf') > -1 || files[i].name.indexOf('.doc') > -1 || files[i].name.indexOf('.docx') > -1
        || files[i].name.indexOf('.xls') > -1 || files[i].name.indexOf('.xlsx') > -1 || files[i].name.indexOf('.ppt') > -1 || files[i].name.indexOf('.pptx') > -1) {
        this.removeOtherFiles();
        this.otherFileList.push(files[i]);
      }

    }
  }

  imagePreviewList(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (this.capturedMedialist.length + this.imageFileList.length < this.imageLimit) {
        this.imageFileList.push({"fileUrl": reader.result, "fileBlob": file})
      } else {
        this.showAlertMessage("Error", "", MessagesConstants.imageLimit + this.imageLimit + MessagesConstants.images, 4000)
         }

    }
  }

  videoPreviewList(file: File) {
    let that = this;
    this.removeOtherFiles();
    var video = document.createElement('video');

    video.preload = 'metadata';
    video.onloadedmetadata = function (e) {

      window.URL.revokeObjectURL(video.src);
      var duration = video.duration;

      that.addVideoFileToList(video, file, duration);

    }
    video.src = URL.createObjectURL(file);
    this.videoFileList.push({"fileUrl": video.src, "fileBlob": file});

  }

  addVideoFileToList(video, file, duration) {
    if (duration > this.audioVideoLimit) {
      this.videoFileList = [];
      this.showAlertMessage("Error", "", "you can upload only " + this.audioVideoLimit + " seconds video.", 4000)

    }
  }


  //************************************************Select File Form Computer **********************************************/

  //************************************************Remove File Form List **********************************************/

  removeFileFromImageList(index) {
    this.imageFileList.splice(index, 1);
  }

  removeFileFromAudioList(index) {
    this.audioFileList.splice(index);
  }

  removeFileFromVideoList(index) {
    this.capturedVideoList.splice(index);
    this.videoFileList.splice(index);
  }

  removeFileFromCapturedImageList(index) {
    this.capturedMedialist.splice(index, 1);
  }

  removeFileFromList(index) {
    this.otherFileList.pop();
  }

  removeSelectedMediaFile() {
    this.recentUploadedMediaSelected.pop();

  }

  removeOtherFiles() {
    this.audioFileList.splice(0, this.audioFileList.length);
    this.imageFileList.splice(0, this.imageFileList.length);
    this.videoFileList.splice(0, this.videoFileList.length);
    this.otherFileList.splice(0, this.otherFileList.length);
    this.recentUploadedMediaSelected.splice(0, this.recentUploadedMediaSelected.length);
    this.capturedMedialist.splice(0, this.capturedMedialist.length);
    this.capturedVideoList.splice(0, this.capturedVideoList.length);
  }

  removeOtherFilesFromListForAudio() {
    this.audioFileList.splice(0, this.audioFileList.length);
    this.videoFileList.splice(0, this.videoFileList.length);
    this.otherFileList.splice(0, this.otherFileList.length);
    this.capturedVideoList.splice(0, this.capturedVideoList.length);
    this.recentUploadedMediaSelected.splice(0, this.recentUploadedMediaSelected.length);
  }

  //************************************************Remove File Form List **********************************************/

  //************************************************Api Callings **********************************************/

  searchMedia(event) {
    let haveValidChars: boolean;
    haveValidChars = UtitlityService.haveValidChars(event.target.value);
    if (event.target.value && haveValidChars) {
      this.httpUserUtilsService.searchExistingFile(this, false, event.target.value);
    } else {
      this.httpUserUtilsService.searchExistingFile(this, false);
    }
  }

  selectRecentMediaFile(media) {
    this.removeOtherFiles();
    this.recentUploadedMediaSelected.push(media);
  }

  selectRecentMedia(media) {
    this.removeOtherFiles();
    this.recentUploadedMediaSelected.push(media);
  }

  getBoardList() {
    if (this.newsText.trim().length > 0 || this.getAllselectedFileLength() > 0) {
      this.totalResponseReceived.splice(0, this.totalResponseReceived.length)
      this.selectBoardListComponent = UtitlityService.openModal(this.modalService, SelectBoardListComponent);
      this.selectBoardListComponent.componentInstance.parent=this;
    }

  }

  postNews(value) {
    this.diablePostButton=true;
 if (this.getAllselectedFileLength() > 0) {
      this.isPublish = false;
    } else {
      this.isPublish = true
    }
    let list = this.newsText.match(this.pattern);
    if (list && list.length > 0) {
      list.forEach(element => {
        let mentionedObject = _.find(this.mentionedUserList, function (mentionObject, index) {
          if (mentionObject.mentionString === element) {
            return true;
          }
        });
        if (mentionedObject) {
          let encodedTaggingString = UtitlityService.encodeUserTaggingString(mentionedObject.mentionObject);
          this.newsText.replace(element, encodedTaggingString);
        }
      });
    }

    this.httpUserUtilsService.postNews(this.newsText.trim(), value.selectedBoardIds, this.isPublish, value.defaultPublicBoard.masterPostTypeId, this, true);
    this.selectBoardListComponent.componentInstance.activeModal.close('news post board selected');
  }

  //************************************************Api Callings **********************************************/


  //************************************************Video Capture  **********************************************/
  addVideoToList() {
    if (this.capturedObjcet) {
      this.removeOtherFiles();
      this.capturedVideoList.push(this.capturedObjcet);
      this.closeOpenedModal('#TakeaPhoto');
      this.capturedObjcet = null;
    } else {
      this.showAlertMessage("Error", "", "please capture a video before adding to list", 4000)

    }

  }


//************************************************ Video Capture  **********************************************/


  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.boardMediaUrlCode :
        this.boardmediaList = responsedata;
        this.boardmediaList.forEach(element => {
          element.media.forEach(element => {
            this.recentlyUploadedMediaList.push(element);

          });
        });
        break
      case Constants.FileUploadProgress :

        break;
      case UrlResponseCodes.postNewsResponseCode :
        this.newsPostId = responsedata[0].id;
        if (this.isPublish) {
          this.clearDataOnPublish(responsedata,responsedata.length);
        } else {
          this.processNewsFiles();
        }
        break;
      case UrlResponseCodes.fileUploadResponse :
        this.publishNews(true);

        break;
      case UrlResponseCodes.publishNewsResponseCode :
        this.clearDataOnPublish(responsedata,responsedata.length);

        break;
      case UrlResponseCodes.existingMediaUploadCode :
        this.publishNews(true);

        break;
      case UrlResponseCodes.userMentionResponseCode :

        this.userMentionList = responsedata;
        if (this.userMentionList && this.userMentionList.length > 0) {
          $('.exploreMention').slideDown('slow');

        } else {
          $('.exploreMention').slideUp('slow');

        }

        break;
      case UrlResponseCodes.userTaggingResponseCode :
        this.hashTagDataList = responsedata;
        if (this.hashTagDataList && this.hashTagDataList.length > 0) {
          $('.exploreTag').slideDown('slow');

        } else {
          $('.exploreTag').slideUp('slow');

        }
        break;
    }
  }

  onFailure(type: any, response: string) {
    this.diablePostButton=false;
    switch (type) {
      case UrlResponseCodes.boardMediaUrlCode :
        AppLogger.log(UrlResponseCodes.boardMediaUrlCode, response);
        break;
      case UrlResponseCodes.postNewsResponseCode :
        this.showAlertMessage("Error", "", response, 4000)
         break;
      case UrlResponseCodes.fileUploadResponse :
        this.errorMessage = response;
        this.publishNews(false);
        break;
      case UrlResponseCodes.publishNewsResponseCode :
        AppLogger.log(UrlResponseCodes.publishNewsResponseCode, response);
        this.showAlertMessage("Error", "", response, 2000);

        break;
      case UrlResponseCodes.existingMediaUploadCode :
        this.publishNews(false);

        break;

      case UrlResponseCodes.userMentionResponseCode :
        $('.exploreMention').slideUp('slow');

        break;
      case UrlResponseCodes.userTaggingResponseCode :
        $('.exploreTag').slideUp('slow');

        break;
    }
  }

  clearDataOnPublish(responsedata,length) {
    this.diablePostButton=false;
    this.removeOtherFiles();
    this.shareDataSubscriptionService.newsPublished(responsedata);
    this.shareDataSubscriptionService.newsPublishedAddNews(length);

    this.newsText = '';
    this.totalResponseReceived = [];
    this.showAlertMessage("Success", "", MessagesConstants.PostPublishSuccess, 2000);
  }

  processNewsFiles() {
    if (this.recentUploadedMediaSelected.length > 0) {
      this.httpUserUtilsService.uploadExistingFile(this.recentUploadedMediaSelected[0].id, this.newsPostId, this, true)
    } else if (this.videoFileList.length > 0) {
      let list = [];
      this.videoFileList.forEach(element => {
        list.push(element.fileBlob);
      });
      this.httpUserUtilsService.uploadMedia(this.newsPostId, 'NewsPost', 'news', new Date().getMilliseconds(), list, 'Video', this, true)

    } else if (this.capturedVideoList.length > 0) {

      this.httpUserUtilsService.uploadMediaJS(this.newsPostId, 'NewsPost', 'news', 'Video', this.capturedVideoList, '.webm', this, true)
    }
    else if (this.otherFileList.length > 0) {
      let filetype = this.otherFileList[0].name.split(".");
      this.httpUserUtilsService.uploadMedia(this.newsPostId, 'NewsPost', 'news', new Date().getMilliseconds(), this.otherFileList, filetype[filetype.length - 1].toUpperCase(), this, true)
    }
    else if ((this.capturedMedialist.length + this.imageFileList.length) > 0 && this.audioFileList.length > 0) {
      let list = [];
      this.imageFileList.forEach(element => {
        list.push(element.fileBlob);
      });
      this.capturedMedialist.forEach(element => {
        list.push(element.fileBlob);
        //this.httpUserUtilsService.uploadMediaJS(this.newsPostId,'NewsPost','news','Image',element.fileBlob,'.jpg',this,true)
      });
      this.httpUserUtilsService.uploadMedia(this.newsPostId, 'NewsPost', 'news', new Date().getMilliseconds(), list, 'Image', this, true)
      this.httpUserUtilsService.uploadMediaJS(this.newsPostId, 'NewsPost', 'news', 'Audio', this.audioFileList, '.aac', this, true)


    }
    else if ((this.capturedMedialist.length + this.imageFileList.length) > 0) {
      let list = [];
      this.capturedMedialist.forEach(element => {
        list.push(element.fileBlob);
      });
      this.imageFileList.forEach(element => {
        list.push(element.fileBlob);
      });
      this.httpUserUtilsService.uploadMedia(this.newsPostId, 'NewsPost', 'news', new Date().getMilliseconds(), list, 'Image', this, true)
    } else if (this.audioFileList.length > 0) {
      this.httpUserUtilsService.uploadMediaJS(this.newsPostId, 'NewsPost', 'news', 'Audio', this.audioFileList, '.aac', this, true);
    }
  }

  getAllselectedFileLength() {
    return this.recentUploadedMediaSelected.length + this.capturedMedialist.length + this.imageFileList.length +
      this.audioFileList.length + this.otherFileList.length + this.capturedVideoList.length + this.videoFileList.length;
  }

  publishNews(value) {
    this.totalResponseReceived.push(value);
    if (this.getAllselectedFileLength() === this.totalResponseReceived.length) {
      const result = this.totalResponseReceived.filter(word => word == false);
      if (result.length == 0) {
        this.callPublishNewsApi();
      }
      else {
        if (this.newsText.length == 0 && result.length == this.getAllselectedFileLength()) {
          this.openConfirmationPopup('News Post', this.errorMessage, 'Publish', 'Retry', false, true);


        } else {
          this.openConfirmationPopup('News Post', this.errorMessage, 'Publish', 'Retry');

        }
      }
    }
  }

  callPublishNewsApi() {
    this.httpUserUtilsService.publishNews(this.newsPostId, this, true);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  confirmAction() {
    this.callPublishNewsApi();
  }

  cancelAction() {
    this.getBoardList();

  }

  openConfirmationPopup(title, message, confirmText, cancelText, showConfirm?: any, showCancel?: any) {
    let conFirmationPopup;
    conFirmationPopup = UtitlityService.openModal(this.modalService, CommonConfirmationPopupComponent);
    conFirmationPopup.componentInstance.parent = this;
    conFirmationPopup.componentInstance.title = title;
    conFirmationPopup.componentInstance.message = message;
    conFirmationPopup.componentInstance.confirmText = confirmText;
    conFirmationPopup.componentInstance.cancelText = cancelText;
    if (showCancel != undefined) {
      conFirmationPopup.componentInstance.showCancel = showCancel;
    }
    if (showConfirm != undefined) {
      conFirmationPopup.componentInstance.showConfirm = showConfirm;

    }

  }

  closeOpenedModal(id) {
    $(id).modal('hide');
}

  public fromSecondsToMinutes(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }
  @Debounce(250)
  tAGGING(event) {
    this.mentionUsers(event)
    this.addHashTag(event);
  }

//********************************************User Mention and Tagging ***********************************  */
  userSelectedForMention(user: UserMentionData) {
    this.newsText = this.replaceLast(this.newsText, this.queryMention, user.username);
    this.mentionedUserList.push({mentionString: '@' + user.username, mentionObject: user});
    $('.exploreMention').slideUp('slow');

  }

  userSelectedForTag(user: HashTagData) {
    this.newsText = this.replaceLast(this.newsText, this.querytag, user.name);
    $('.exploreTag').slideUp('slow');

  }

  mentionUsers(event) {
    let myString = event.target.value;
    var cursorPosition = $('#phrase').prop("selectionStart");
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
        $('.exploreMention').slideUp('slow');

      }
      return
    } 
    if (list1) {
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
        $('.exploreMention').slideUp('slow');

      }
    }
    else {
      this.mentionedUserList = [];
      $('.exploreMention').slideUp('slow');

    }
   }
   addHashTag(event){
    let myString = event.target.value;
    var cursorPosition = $('#phrase').prop("selectionStart");
    myString = myString.substring(0,cursorPosition);
    let list = myString.match(this.patternHashTag);
    let list1 = myString.match(this.patternHashTag1);
    if(list && list.length==list1.length){
      let lastMention = list[list.length-1]
      let indexOfmention= myString.lastIndexOf(lastMention)
      let indexOflastSpace= myString.lastIndexOf(' ');

      let lastCharOfpattern=lastMention.substr(lastMention.length -1);
      let lastCharOfMyString=myString.substr(myString.length -1);
      this.querytag=lastMention.substr(1);
       if(lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace){
        this.httpUserUtilsService.userHashTag(this.querytag,0,this,true);
      }else{
        $('.exploreTag').slideUp('slow');

      }
      return;
    }
    if(list1){
      let lastMention = list1[list1.length-1]
      let indexOfmention= myString.lastIndexOf(lastMention)
      let indexOflastSpace= myString.lastIndexOf(' ');

      let lastCharOfpattern=lastMention.substr(lastMention.length -1);
      let lastCharOfMyString=myString.substr(myString.length -1);
      this.querytag=lastMention.substr(1);
       if(lastCharOfpattern === lastCharOfMyString && indexOfmention > indexOflastSpace){
        this.httpUserUtilsService.userHashTag(this.querytag,0,this,true);
      }else{
        $('.exploreTag').slideUp('slow');

      }
      return;
    }
    else{
      $('.exploreTag').slideUp('slow');

    }
  }

  replaceLast(x, y, z) {
    var cursorPosition = $('#phrase').prop("selectionStart");
    var a1=x.substring(0,cursorPosition);
    var a2=x.substring(cursorPosition);
    let lastIndex= a1.lastIndexOf(y);
    return a1.substring(0,lastIndex)+z+" "+a2;
  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }
  alertOnDeviceError(err){
    if(err.message!=undefined){
      if(err.name == 'NotAllowedError'){
       alert(MessagesConstants.NotAllowedError);

      }else{
       alert(err.message);

      }
     }else{
       alert(MessagesConstants.someErrorMediaAccess);

     }
  }
  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }
  if (!isFound) {
      var dynamicStyles = ["https://vjs.zencdn.net/6.6.3/video-js.min.css","assets/js/videojs.record.css"];

      for (var i = 0; i < dynamicStyles .length; i++) {
          let node = document.createElement('link');
          node.href = dynamicStyles [i];
          node.rel = "stylesheet";
          document.getElementsByTagName('head')[0].appendChild(node);
      }

        var dynamicScripts = ["assets/js/video.min.js","assets/js/RecordRTC.js","assets/js/adapter.js","assets/js/wavesurfer.min.js",
        "assets/js/wavesurfer.microphone.min.js","assets/js/videojs.wavesurfer.min.js","assets/js/videojs.record.js"
      ];

        for (var i = 0; i < dynamicScripts .length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}
//###################################################################

download() {
  this.recordRTC.save('video.webm');
}
}
