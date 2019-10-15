import { MessagesConstants } from './../constants';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timestampToday'})
export class TimeStampToDayPipe implements PipeTransform {
  public localeId = environment.language == 'ar'?'ar-EG':'en-US';

  transform(value: number): any {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const seconds = (currentTimeStamp - (value) / 1000);
    const daysDifference = this.secondToMinuteHoursDays(seconds, value);
    return daysDifference;
  }

  secondToMinuteHoursDays(seconds: number, value: number) {
    if (seconds < 60) {
      return MessagesConstants.justNow;
    } else if (seconds < (60 * 60)) {
      return Math.round(seconds / 60).toLocaleString(this.localeId) + ' ' + this.addSingularAndPlural(seconds, 60,'m');

    } else if (seconds < (60 * 60 * 24)) {
      return Math.round(seconds / (60 * 60)).toLocaleString(this.localeId) + ' ' + this.addSingularAndPlural(seconds, 60 * 60,'h');

    } else if (seconds < (60 * 60 * 24 * 7)) {
      return Math.round(seconds / (60 * 60 * 24)).toLocaleString(this.localeId) + ' ' + this.addSingularAndPlural(seconds, 60 * 60 * 24,'d');
    } else {
      return this.timeConverter(value);
    }


  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    var retDate
    try{
      const dateOfBirth = new DatePipe(this.localeId);
      retDate =dateOfBirth.transform(date + ' ' + month + ' ' + year, 'dd MMM yyyy')
    }catch(e){
      retDate=date + ' ' + month + ' ' + year;
    }
    return retDate;

  }

  addSingularAndPlural(seconds: number, value: number,type:string) {
    let singularPluralString = '';
    if(type=="m"){
      const isSingular = Math.round(seconds / (value));
      if (isSingular > 1) {
        singularPluralString=MessagesConstants.minutes;  
      }else{
        singularPluralString=MessagesConstants.minute;  

      }
    }
    if(type=="h"){
      const isSingular = Math.round(seconds / (value));
      if (isSingular > 1) {
        singularPluralString=MessagesConstants.hours;  
      }  else{
        singularPluralString=MessagesConstants.hour;  
 
      }
    }
    if(type=="d"){
      const isSingular = Math.round(seconds / (value));
      if (isSingular > 1) {
        singularPluralString=MessagesConstants.days;  
      }else{
        singularPluralString=MessagesConstants.day;  
      }  
    }
  
    return singularPluralString;


  }


}
