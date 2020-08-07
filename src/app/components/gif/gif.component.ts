//GifComponent - Holding and displaying the data of one gif

import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gif',
  templateUrl: 'gif.component.html',
  styleUrls: ['gif.component.scss'],
})
export class GifComponent implements OnInit, OnChanges {
  //Data Vars with default values
  faHeart = faHeart;
  private innerLiked: boolean = false;

  @Input()
  set liked(val: boolean) {
    this.innerLiked = val;
    this.ngOnChanges();
  }

  get liked() {
    return this.innerLiked;
  }

  @Output()
  favButtonPressed = new EventEmitter<string>();

  @Input()
  title: string = 'Kein Titel';

  @Input()
  url: string = 'Error: No Url';

  // @Input()
  id: string = 'TqiwHbFBaZ4ti';

  @Input('id')
  set setableId(val: string) {
    this.id = val;
    this.mediaUrl = `https://media.giphy.com/media/${this.id}/giphy.gif`;
  }

  mediaUrl: string = 'https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif';

  ngOnInit() {
    //this.mediaUrl = `https://media.giphy.com/media/${this.id}/giphy.gif`; //when initialized the media url is generated from the id
    this.liked = localStorage.getItem('favGifIds')?.includes(this.id); //set the liked by checking if id is saved in localstorage
  }

  ngOnChanges() {
    // if one input changes this gets called
  }

  HeartClicked() {
    this.favButtonPressed.emit(this.id);
  }
}
