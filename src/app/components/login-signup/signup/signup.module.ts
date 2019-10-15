//angular core imports
import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//component imports
import { SignupComponent } from './signup.component';
//library imports
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Ng2CompleterModule } from '../../../autocomplete/ng2-completer.module';


@NgModule({
  declarations: [
    SignupComponent,
    ],
  imports: [
    ReactiveFormsModule,    
    FormsModule,
    Ng2CompleterModule,
    CommonModule
  ],
  entryComponents: [SignupComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SignupModule { }
