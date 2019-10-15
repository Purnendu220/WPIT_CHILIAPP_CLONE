import { StorageService } from './../core/storage-service.service';
import  {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { UtitlityService } from '../core/utils.service';

@Injectable()
export class AuthGuardLoginCheckService  implements CanActivate{

  constructor( private router : Router) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(!StorageService.getIsLoggedIn()){
      UtitlityService.redirectUser(this.router,'')
       return false;
    }else{
        return true;

    }
    
  }
}
