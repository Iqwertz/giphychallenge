import { environment } from './../environments/environment';
import { ResponseInterface } from './services/search.service';
import { Component } from '@angular/core';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gifAmount: number = environment.gifAmount;
  currentSearch: string = '';
  search$ = new Subject<string>();
  moreGifs: boolean = true;
  loader: boolean = false;
  smallLoader: boolean = false;
  showStickers: boolean = false;
  enableStickerSelection: boolean = true;
  searchDelay: number = 150;
  faHeart = faHeart;
  faSearch = faSearch;
  gifs: ResponseInterface; //Var holding the http response

  constructor(public router: Router) {}
}
