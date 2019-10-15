import {Component, OnInit, Inject} from '@angular/core';
import {UtitlityService} from '../../core/utils.service';
import {HttpUserUtilsService} from '../../httpWrapperModule/http_user_util.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesConstants} from '../../core/constants';
import {LoginComponent} from '../login-signup/login/login.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../common/validation-message-component/validation-service.service';
import {ShareDataSubscriptionService} from '../common/sharedata-subscription.service';
import { SignupComponent } from '../login-signup/signup/signup.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public language = '';
  private formbuilder: FormBuilder;
  private isCookiesDisabled: boolean = false;
  leadData: FormGroup;

  constructor(private _router: Router, @Inject(DOCUMENT) private document: any,
              private modalService: NgbModal,
              private shareDataSubscriptionService: ShareDataSubscriptionService,
              private http_user_utils: HttpUserUtilsService) {
  }

  ngAfterViewInit() {


  }
  ngOnInit() {
    if (this.document.URL.indexOf('/ar') > -1) {
      this.language = 'ar';
    } else {
      this.language = 'en';

    }
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

  leadForFacultyFromWebapp(email: string) {
    const message = $('#summernote').val();
    if (message && email.trim()) {
      const leadData = {email: email, message: message, subject: 'Lead for faculty'};
      this.http_user_utils.planLeadMail(leadData, this, true);
    } else {
      alert('Email & Message required!');
    }

  }

  onFailure(type: any, response: string, failedId?: any) {
    this.showAlertMessage('Error', '', response, 4000);
  }

  onSuccess(type: any, responsedata: any, successId?: number) {
    alert('Request successfully send to myU team');
    $('#reqQuote').modal('hide');
  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
  }

}
