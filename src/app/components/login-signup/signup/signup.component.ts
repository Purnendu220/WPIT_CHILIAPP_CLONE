import { BaseComponentComponent } from './../../base-component/base-component.component';
import { HttpSuccesFailureResponse } from './../../../httpWrapperModule/http_wrapper_response.intreface';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from "../login/login.component";
import { UtitlityService } from '../../../core/utils.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../common/validation-message-component/validation-service.service';
import { HttpCommonUtilsService } from '../../../httpWrapperModule/http_common_util.service';
import { UrlResponseCodes, UrlConstants, Constants, MessagesConstants } from '../../../core/constants';
import { UniversityListData } from '../../../httpWrapperModule/responseModels/universityListResponse';
import { HttpUserUtilsService } from '../../../httpWrapperModule/http_user_util.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { RemoteData, CompleterService } from '../../../autocomplete/index';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent extends BaseComponentComponent  implements OnInit, HttpSuccesFailureResponse {

  errorInLogin = false;
  errorMessage: string = '';
  errorInsignup = false;
  public stepSwitchCase: number = 1;
  public userType: number = 0;
  public signupForm: FormGroup;
  public universityDataService: RemoteData;
  public universityid: number;
  passtype = "password";
  usernamePattern ="^[A-Za-z][a-zA-Z0-9_]*$";

  public universityList: UniversityListData[];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private http_common_utils: HttpCommonUtilsService,
    private http_user_utils: HttpUserUtilsService,
    private router: Router,
    private completerService: CompleterService,public Browserlocation: PlatformLocation) {
    super();
      Browserlocation.onPopState(() => {
        this.activeModal.close('Close Model');
    });  
      
     }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      universityName: new FormControl(null, {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      name: ['', [ValidationService.requiredValidator, Validators.maxLength(250)]],
      userName: ['', [ValidationService.requiredValidator,Validators.pattern(this.usernamePattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [ValidationService.requiredValidator, Validators.email]],
    });
    this.setUpRemoteDataUniversityList();
  }
  openLogin() {
    this.activeModal.close('Cross click');
    const modalRef = UtitlityService.openModal(this.modalService, LoginComponent);
  }
  signupProcessLogin() {
    this.http_user_utils.login(this.signupForm.value.userName, this.signupForm.value.password, this, true);
  }

  moveToStep2() {
    if (this.userType > 0) {
      this.stepSwitchCase = 2;
    }
  }

  moveToStep3() {
    this.signupForm.controls.universityName.markAsTouched();
    if (this.signupForm.controls.universityName.errors == null) {
      this.stepSwitchCase = 3;
    }


  }
  moveToStep4() {

    if (this.signupForm.valid) {
      this.http_user_utils.signup(this.userType, this.universityid, this.signupForm.value.name, this.signupForm.value.userName,
        this.signupForm.value.email, this.signupForm.value.password,
        this, true);
    }

  }


  selectUniversity(event) {
    if (event) {
      this.universityid = event.originalObject.id;
    } else {
      this.universityid = undefined;
    }

  }

  setUpRemoteDataUniversityList() {
    this.universityDataService = this.completerService.remote(null, "name", "name");
    this.universityDataService.urlFormater(term => {
      return UrlConstants.getAllUniversitiesList + "type=university&query=" + term + "&page=0&size=" + Constants.pageSize;
    });
    this.universityDataService.dataField("data");
  }
  onSuccess(type: any, responsedata: any) {
    switch (type) {
      case UrlResponseCodes.signupUserCode:
        this.errorInsignup = false;
        this.stepSwitchCase = 4;
        break;

      case UrlResponseCodes.loginUserCode:
        this.errorInLogin = false;
        UtitlityService.redirectUser(this.router,'newsfeed',responsedata.id)
        this.activeModal.close('cross click');
        break;
    }

  }
  onFailure(type: any, response: string) {
    switch (type) {
      case UrlResponseCodes.signupUserCode:
        this.errorInsignup = true;
        this.errorMessage = response;
        break;

      case UrlResponseCodes.loginUserCode:
        this.errorInLogin = true;
        this.errorMessage = response;
        break;
    }

  }

  showHidePassword(){
    this.passtype = this.passtype==="password"? "text":"password";
}
}