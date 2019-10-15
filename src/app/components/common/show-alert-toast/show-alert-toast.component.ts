import { ShareDataSubscriptionService } from './../sharedata-subscription.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertState } from './alert-state';

declare var $: any;

@Component({
  selector: 'app-show-alert-toast',
  templateUrl: './show-alert-toast.component.html',
  styleUrls: ['./show-alert-toast.component.scss']
})
export class ShowAlertToastComponent implements OnInit {
  public message:string;
  public status:string;
  private subscription: Subscription;
  public alertTime:any=2000;

 constructor(private globalSubscriptionService:ShareDataSubscriptionService) {
    }

 ngOnInit() {

  this.subscription = this.globalSubscriptionService.alertState
           .subscribe((state: AlertState) => {
      if(state.alertTime){this.alertTime = state.alertTime;}
       if(state.statusCode.length>0){
        this.status=state.statusCode;
        this.message ="Error "+state.statusCode + state.statusMessage;
      }else{ this.message = state.statusMessage;}
       this.showAlert(state.alertType);

            });
 }
 showAlert(type){
    var x = document.getElementById("snackbar")
    x.className = type.toLowerCase();
    setTimeout(function(){ x.className = x.className.replace(type.toLowerCase(), ""); }, this.alertTime);
     
     
 }



   
}
