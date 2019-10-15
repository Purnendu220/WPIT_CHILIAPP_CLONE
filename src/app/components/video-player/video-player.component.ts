import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { VgAPI } from '../../../../node_modules/videogular2/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {
  @Input()
  public videoPath: string;
  public  type: string = 'video/mp4';

  
  @Output() videoPlaying = new EventEmitter();


  api: VgAPI;

  constructor() {

  }

  ngOnInit() {
    // alert(this.videoPath);
  }
  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.playing.subscribe(
      () => {
         this.videoPlaying.emit(this.api)
      }
  );
}
}
