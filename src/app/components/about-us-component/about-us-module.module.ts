import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingAboutPage } from './about-us-routing';
import { AboutUsComponentComponent } from './about-us-component.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingAboutPage,
    NgbModule.forRoot()
  ],
  declarations: [AboutUsComponentComponent]
})
export class AboutUsModuleModule { }
