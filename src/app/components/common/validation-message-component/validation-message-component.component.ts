import { Component, OnInit, Input } from '@angular/core';
import { ValidationService } from './validation-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message-component',
  templateUrl: './validation-message-component.component.html',
  styleUrls: ['./validation-message-component.component.scss']
})
export class ValidationMessageComponent  {

  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}
