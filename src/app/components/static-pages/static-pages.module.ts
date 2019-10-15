import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticPagesComponent } from './static-pages.component';
import { RoutingStaticPages } from './static-pages.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupModule } from '../login-signup/signup/signup.module';
import { LoginModule } from '../login-signup/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingStaticPages,
    LoginModule,
    SignupModule,
    NgbModule.forRoot()
  ],
  declarations: [StaticPagesComponent]
})
export class StaticPagesModule { }
