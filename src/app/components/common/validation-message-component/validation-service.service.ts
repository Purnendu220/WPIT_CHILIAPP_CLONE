import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        //static myvalue=environment.xyz==3?"arabic value":" english value";
         'required': environment.language == 'ar'?"هذه الخانة الزامية":"This information is required.",
         'maxlength': environment.language == 'ar'?`Maximum length ${validatorValue.requiredLength} characters.`:`Maximum length ${validatorValue.requiredLength} characters.`,
         'invalidCreditCard': environment.language == 'ar'?"Is invalid credit card number.":"Is invalid credit card number.",
         'invalidEmailAddress': environment.language == 'ar' ? "يبدو ان هناك خطأ في الايميل الذي ادخلته، يرجى مراجعة الخانة والمحاولة مرة اخرى" : "Something seems to be wrong with your email address.",
         'email': environment.language == 'ar' ? "يبدو ان هناك خطأ في الايميل الذي ادخلته، يرجى مراجعة الخانة والمحاولة مرة اخرى" : "Something seems to be wrong with your email address.",

         'invalidPassword': environment.language == 'ar'?"يجب أن تتكون كلمة المرور من ٦ أحرف او ارقام على الأقل":"Invalid password. Password must be at least 6 characters long, and contain a number.",
         'minlength': environment.language == 'ar'?"`Field must contain atleast ${validatorValue.requiredLength} characters.`":`Field must contain atleast ${validatorValue.requiredLength} characters.`,
         'matchPassword': environment.language == 'ar'?"Password does not match.":"Password does not match.",
         'pattern':environment.language == 'ar' ? "Pattern not valid":"Pattern not valid",
         'userPattern': environment.language == 'ar'? "في خانة اسم المستخدم يمكنك فقط استخدام الحروف الانجليزية او الارقام او underscore": "You may only use letters, numbers, and underscores.",
         'numberPattern': environment.language == 'ar'? "يرجى إدخال رقم هاتف صالح": "Please enter a valid phone number"
    };

    return config[validatorName];
}
static emailValidator(control) {
       if(control.value.length>0){
if (control.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return null;
    } else {
        return { 'invalidEmailAddress': true };
    }
    }
    else{
        return { 'required': true };

    }
   
}
static userPattern(conttol){
    if(conttol.value.match(/^[A-Za-z][a-zA-Z0-9_]*$/)){
        return null;
    }
    else {
        return { 'userPattern': true };
    }
};
static numberPattern(conttol){
    if(!conttol.value||conttol.value.length==0||conttol.value.match(/^[+0-9][0-9]*$/)){
        return null;
    }
    else {
        return { 'numberPattern': true };
    }
};

static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
    } else {
        return { 'invalidPassword': true };
    }
}
static requiredValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.trim().length>0) {
        return null;
    } else {
        return { 'required': true };
    }
}

static checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
            passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({'matchPassword': true})
        }
        else {
            if(passwordInput.value.length==0&&passwordConfirmationInput.value.length==0){

            }else{
                return passwordConfirmationInput.setErrors(null);

            }
        }
      }
    }




     


}
