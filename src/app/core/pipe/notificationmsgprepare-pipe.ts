import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notificationmsgprepare',
})
export class NotificationmsgPrepare implements PipeTransform {
    transform(msgJsonStr: string, key: string) {
        let msgJsonObj = JSON.parse(msgJsonStr);        
        let finalMsg = msgJsonObj[key];       
        return finalMsg;
    }
}
