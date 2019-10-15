import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-gaurd.service';
import { AuthGuardLoginCheckService } from './auth-gaurd-login-check.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthGuardService,AuthGuardLoginCheckService]
})
export class AuthGaurdModuleModule { }
