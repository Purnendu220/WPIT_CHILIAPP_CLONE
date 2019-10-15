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

@Component({
  selector: 'app-about-us-component',
  templateUrl: './about-us-component.component.html',
  styleUrls: ['./about-us-component.component.scss']
})
export class AboutUsComponentComponent implements OnInit {

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
  openLogin() {
    if (this.isCookiesDisabled) {
      alert(MessagesConstants.CookiesDisabled);
    } else {
      const modalRef = UtitlityService.openModal(this.modalService, LoginComponent);

    }
  }

  handleLanguageChange(value) {
    this.document.location.href = this.document.location.origin + (value != '') ? ('/' + value) : '';
  }

}
