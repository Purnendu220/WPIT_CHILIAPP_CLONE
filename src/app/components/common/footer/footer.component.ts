import { Component, OnInit } from '@angular/core';
import { UtitlityService } from '../../../core/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  routeUser(route, id?: any) {
    if (id) {
        UtitlityService.redirectUser(this.router, route, id)
          return
            }
        UtitlityService.redirectUser(this.router, route)
        
          }
}
