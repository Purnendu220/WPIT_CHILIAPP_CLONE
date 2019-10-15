import { HttpWrapperModule } from './../../../httpWrapperModule/http_wrapper.module';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { routingHome } from './home.routing';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SignupModule } from '../../login-signup/signup/signup.module';
import { LoginModule } from '../../login-signup/login/login.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';





@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    SignupModule,
    routingHome,
    NgbModule.forRoot(),
    HttpWrapperModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule



  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class HomeModule { }
