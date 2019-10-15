import {BaseComponentComponent} from './../../base-component/base-component.component';
import {Component, OnInit, ViewContainerRef, Inject} from '@angular/core';
import {LoginComponent} from '../../login-signup/login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UtitlityService} from '../../../core/utils.service';
import {StorageService} from '../../../core/storage-service.service';
import {MessagesConstants} from '../../../core/constants';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../validation-message-component/validation-service.service';
import {HttpUserUtilsService} from '../../../httpWrapperModule/http_user_util.service';
import {HttpSuccesFailureResponse} from '../../../httpWrapperModule/http_wrapper_response.intreface';
import {ShareDataSubscriptionService} from '../sharedata-subscription.service';
import {DOCUMENT} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})

export class HomeComponent extends BaseComponentComponent implements OnInit, HttpSuccesFailureResponse {

  public openLoginPopup = false;
  private isCookiesDisabled: boolean = false;
  public showContactUsSuccess: boolean = false;
  public language = '';
  contactUs: FormGroup;

  ngAfterViewInit() {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 600) {
        $('.navbar_wrapper').addClass('not_transparent');
      } else {
        $('.navbar_wrapper').removeClass('not_transparent');
      }
    });


    $(document).ready(function () {
      $('body').scrollspy({target: '.navbar', offset: 50});

      // Add smooth scrolling on all links inside the navbar
      $('#bs-example-navbar-collapse-1 a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });
    });
  }

  constructor(private modalService: NgbModal,
              private router: Router,
              private formbuilder: FormBuilder,
              private http_user_utils: HttpUserUtilsService,
              private shareDataSubscriptionService: ShareDataSubscriptionService,
              @Inject(DOCUMENT) private document: any
  ) {
    super();
    try {
      StorageService.getIsLoggedIn();
    }
    catch (e) {
      this.isCookiesDisabled = true;
    }

  }

  ngOnInit() {
    if (this.document.URL.indexOf('/ar') > -1) {
      this.language = 'ar';
    } else {
      this.language = 'en';

    }
    this.contactUsFormInit();
  }

  contactUsFormInit() {
    this.contactUs = this.formbuilder.group({
      'userName': ['', [ValidationService.requiredValidator]],
      'userEmail': ['', [ValidationService.requiredValidator, Validators.email]],
      'userSubject': ['', [ValidationService.requiredValidator]],
      'userMessage': ['', [ValidationService.requiredValidator]]
    });
  }

  openLogin() {
    if (this.isCookiesDisabled) {
      alert(MessagesConstants.CookiesDisabled);
    } else {
      const modalRef = UtitlityService.openModal(this.modalService, LoginComponent);

    }
  }

  routeUser(route, id?: any) {
    if (id) {
      UtitlityService.redirectUser(this.router, route, id);
      return;
    }
    UtitlityService.redirectUser(this.router, route);
    window.scroll(0, 0);
  }

  submitForm() {
    this.markFormGroupTouched(this.contactUs);
    if (this.contactUs.valid) {
      let contactUs = {
        name: this.contactUs.value.userName,
        email: this.contactUs.value.userEmail,
        subject: this.contactUs.value.userSubject,
        message: this.contactUs.value.userMessage
      };
      this.http_user_utils.contactUs(contactUs, this, true);
    }

  }

  onSuccess(type: any, responsedata: any, successId?: number) {
    this.contactUsFormInit();
    this.showContactUsSuccess = true;
    setTimeout(() => {
      this.showContactUsSuccess = false;
    }, 4000);

  }

  onFailure(type: any, response: string, failedId?: any) {
    this.showAlertMessage('Error', '', response, 4000);
  }

  showAlertMessage(type, status, message, erroTime?: any) {
    this.shareDataSubscriptionService.show(type, status, message, erroTime);
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
    }
  }

  handleLanguageChange(value) {
    debugger;
    if (value === 'en') {
      location.assign(environment.hostURLEnglish);

    } else {
      location.assign(environment.hostURLArabic);

    }
  }
}
