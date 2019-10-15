import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { VgAPI } from '../../../../node_modules/videogular2/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Input()
  public audioPath: string;
  public type = 'audio/mp3';

  @Output() audioPlaying = new EventEmitter();


  api: VgAPI;

  constructor() {

  }

  ngOnInit() {

  }
  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.playing.subscribe(
      () => {
         this.audioPlaying.emit(this.api)
      }
  );
}

}
