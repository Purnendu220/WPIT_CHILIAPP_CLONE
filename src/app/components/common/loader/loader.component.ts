import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoaderComponentService } from './loader.service';
import { Subscription } from 'rxjs/Subscription';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show = false;
  public loaderClass: string
  private subscription: Subscription;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  constructor(private loaderService: LoaderComponentService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.loaderClass = state.loaderClass
        this.change.emit(state);

    });
  }

}
