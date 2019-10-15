import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    LoginComponent,
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  entryComponents: [LoginComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class LoginModule { }
