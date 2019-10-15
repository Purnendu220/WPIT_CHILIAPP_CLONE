import { StorageService } from '../core/storage-service.service';
import  {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class UserAgentService  implements CanActivate{

  constructor( private router : Router) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    try{
      debugger;
      var ua = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
            if (/Android/i.test(ua)) {
                window.location.href = "https://play.google.com/store/apps/details?id=com.myu.android";
            }
            else  if (/iPhone|iPad|iPod/i.test(ua)) {
                window.location.href = "https://itunes.apple.com/in/app/myu-school-communication/id740372863?mt=8";
            }
            else{
                return true;
            }


        }
        else {
          return true;
        }

    }catch(e){
      console.log(e);
      return true;

    }
    

  }
}
