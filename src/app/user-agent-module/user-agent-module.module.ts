import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAgentService } from './user-agent.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserAgentService]
})
export class UserAgentModule { }
