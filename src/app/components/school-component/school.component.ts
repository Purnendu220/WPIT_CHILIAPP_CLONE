import {Component, OnInit, Inject} from '@angular/core';
import {UtitlityService} from '../../core/utils.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import {MessagesConstants} from '../../core/constants';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login-signup/login/login.component';
import {ShareDataSubscriptionService} from '../common/sharedata-subscription.service';
import {HttpUserUtilsService} from '../../httpWrapperModule/http_user_util.service';
import { SignupComponent } from '../login-signup/signup/signup.component';

declare var $: any;
declare var jQuery: any;


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  public language = '';
  private isCookiesDisabled: boolean = false;

  constructor(private _router: Router, @Inject(DOCUMENT) private document: any,
              private modalService: NgbModal,              
              private shareDataSubscriptionService: ShareDataSubscriptionService,
              private http_user_utils: HttpUserUtilsService
  ) {
  }

  ngOnInit() {
    if (this.document.URL.indexOf('/ar') > -1) {
      this.language = 'ar';
    } else {
      this.language = 'en';

    }
  }

  ngAfterViewInit() {
    $('.expooo').click(function() {
      $('html,body').animate({
          scrollTop: $('.second').offset().top},
        'slow');
    });
  }


  routeUser(route) {
    UtitlityService.redirectUser(this._router, route);
    window.scroll(0,0);
  }

  openRegister() {    
    const modalRef = UtitlityService.openModal(this.modalService, SignupComponent);
  }

  handleLanguageChange(value) {
    this.document.location.href = this.document.location.origin + (value != '') ? ('/' + value) : '';
  }

  openLogin() {
    if (this.isCookiesDisabled) {
      alert(MessagesConstants.CookiesDisabled);
    } else {
      const modalRef = UtitlityService.openModal(this.modalService, LoginComponent);

    }
  }
  requestQuoteDataEmptySet(){
    $('#summernote').val('');
    $('#school_data').val('');
    $('#emailData').val('');
  }

  leadForSchoolFromWebapp(email: string) {
    const message = $('#summernote').val();
    const school_data = $('#school_data').val();
    if (school_data && message && email.trim()) {
      const leadData = {email: email, message: message.trim(), school: school_data.trim()};
      this.http_user_utils.planLeadMail(leadData, this, true);
    } else {
      alert('All fields are required!');
    }

  }

  onFailure(type: any, response: string, failedId?: any) {
    this.showAlertMessage('Error', '', response, 4000);
    this.requestQuoteDataEmptySet();
  }
  onSuccess(type: any, responsedata: any, successId?: number) {
    alert('Request successfully send to myU team');
    $('#reqQuote').modal('hide');
    this.requestQuoteDataEmptySet();
  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }
}
