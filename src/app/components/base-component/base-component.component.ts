import { Component, OnInit } from '@angular/core';
import { Constants } from '../../core/constants';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {
  siteDirection=Constants.siteDirection;


  ngOnInit() {
  }

}
