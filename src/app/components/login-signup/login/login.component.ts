import { BaseComponentComponent } from './../../base-component/base-component.component';
import { Constants, UrlResponseCodes, MessagesConstants } from './../../../core/constants';
import { HttpSuccesFailureResponse } from './../../../httpWrapperModule/http_wrapper_response.intreface';
import { Component, OnInit, Input } from '@angular/core';
import { SignupComponent } from "../signup/signup.component";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtitlityService } from '../../../core/utils.service';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../common/validation-message-component/validation-service.service';
import { PlatformLocation } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponentComponent implements OnInit, HttpSuccesFailureResponse {

  forgotPasswordSuccess: string;
  errorMessageForgotPassword: string;
  @Input() name;
  loginform: FormGroup;
  forgotPassForm: FormGroup;
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessage: string = '';
  errorInLogin = false;
  passtype = "password";
  forgotPassword: boolean = false;

  constructor(public Browserlocation: PlatformLocation,public activeModal: NgbActiveModal, private modalService: NgbModal, private formbuilder: FormBuilder, private http_user_utils: HttpUserUtilsService, private router: Router) {
    super();
    Browserlocation.onPopState(() => {
      this.activeModal.close('Close Model');
  });  
   }

  ngOnInit() {
    this.loginform = this.formbuilder.group({
      'email': ['', ValidationService.requiredValidator],
      'password': ['', Validators.required]
    });
    this.forgotPassForm = this.formbuilder.group({
      'email': ['', [ValidationService.requiredValidator]]
    });
  }

  processLogin() {
    this.markFormGroupTouched(this.loginform)
    if (this.loginform.valid) {
      this.http_user_utils.login(this.loginform.value.email, this.loginform.value.password, this, true);
    }

  }
  forgotPass() {
    this.markFormGroupTouched(this.forgotPassForm)
    if (this.forgotPassForm.valid) {
      this.http_user_utils.forgotPassword(this.forgotPassForm.value.email, this, true);
    }

  }

  private markFormGroupTouched(formGroup: FormGroup) {
    try {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
    }
    catch (ex) {
      // Code to handle exception
    }
  }

  openRegister() {
    this.activeModal.close('Cross click');
    const modalRef = UtitlityService.openModal(this.modalService, SignupComponent);
  }

  navigateTo(url) {
    this.activeModal.close('close modal');
    this.router.navigateByUrl("/" + url);
  }
  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.loginUserCode:
        this.errorInLogin = false;
        UtitlityService.redirectUser(this.router,'newsfeed',responsedata.id)
        this.activeModal.close('Cross click');
        break;

      case UrlResponseCodes.userForgotPasswordCode:
        console.log("success");
        this.forgotPasswordSuccess = MessagesConstants.emailSentSuccessfully;
        setTimeout(() => {
          this.forgotPasswordSuccess = '';
          this.forgotPassword = false;

        }, 5000);
        break;
    }

  }
  onFailure(type: any, response: string) {
    switch (type) {
      case UrlResponseCodes.loginUserCode:
        this.errorInLogin = true;
        this.errorMessage = response;
        break;

      case UrlResponseCodes.userForgotPasswordCode:
        this.errorMessageForgotPassword = response;
        setTimeout(() => {
          this.errorMessageForgotPassword = '';
        }, 4000);
        break;

    }

  }

  showHidePassword(){
    this.passtype = this.passtype==="password"? "text":"password";
}

  blurFoucus(){
    $('input[name=forgot_email]').blur();
    this.forgotPassword=false;
  }
}
