import { Directive, Renderer, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[click-stop-propagation]'
})
export class ClickStopPropagationDirective {

  //constructor(elem: ElementRef, renderer: Renderer) { }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

}
