import { StorageService } from './../core/storage-service.service';
import  {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { UtitlityService } from '../core/utils.service';

@Injectable()
export class AuthGuardService  implements CanActivate{

  constructor( private router : Router) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    try{
      if(StorageService.getIsLoggedIn()){
        UtitlityService.redirectUser(this.router,'user',StorageService.getUserId())
        return false;
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
