import { StorageService } from './../../core/storage-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesConstants } from '../../core/constants';
import { UtitlityService } from '../../core/utils.service';
import { LoginComponent } from '../login-signup/login/login.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

  language: string;
  activeUrl: string;
  private isCookiesDisabled: boolean = false;
  public isLoggedin: boolean = StorageService.getIsLoggedIn();
  constructor(private router: Router, private modalService: NgbModal,@Inject(DOCUMENT) private document: any) {

    try {
      StorageService.getIsLoggedIn();
    }
    catch (e) {
      this.isCookiesDisabled = true;
    }

  }

  ngOnInit() {
    if(this.document.URL.indexOf('/en')>-1){
      this.language='en';
     }else{
      this.language='ar';

     }
    this.activeUrl = this.router.url;
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
      UtitlityService.redirectUser(this.router, route, id)
      return
    }
    UtitlityService.redirectUser(this.router, route)

  }
  handleLanguageChange(value){
    this.document.location.href = this.document.location.origin + (value !="")? ("/"+value) :""
  }
}
