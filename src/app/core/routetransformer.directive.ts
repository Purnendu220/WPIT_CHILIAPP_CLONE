import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UtitlityService } from './utils.service';

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event) {
    if (event.target.tagName === 'A') {
      UtitlityService.redirectUser(this.router,event.target.getAttribute('href'));

      event.preventDefault();
    } else {
      return;
    }
  }

};