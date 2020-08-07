import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import { LoadMore } from './../../services/load-more.service';
import { TrendingService } from './../../services/trending.service';
import { FavoriteService } from './../../services/favorites.service';
import {
  SearchService,
  ResponseInterface,
} from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { tap, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  smallLoader: boolean = false;
  searchInput: string; //dualBinded var holding the searfield input
  currentSearch: string = '';
  enableStickerSelection: boolean = true;
  loader: boolean = false;
  gifs: ResponseInterface; //Var holding the http response
  showStickers: boolean = false;
  moreGifs: boolean = true;
  search$ = new Subject<string>();
  gifAmount: number = environment.gifAmount;
  searchDelay: number = 150;
  faFrown = faFrown;

  constructor(
    private searchService: SearchService,
    public favoriteService: FavoriteService,
    private trendingService: TrendingService,
    private loadMore: LoadMore
  ) {}

  ngOnInit(): void {
    console.log('init'); //log init (for debugging)
    this.showTrending(); //shows Trends

    this.search$
      .pipe(
        tap(() => {
          this.smallLoader = true;
        }),
        debounceTime(this.searchDelay),
        tap((result) => {
          this.currentSearch = result;
        }),
        switchMap((q) => {
          return this.searchService.searchWithTrendingFallback(
            q,
            this.gifAmount,
            this.showStickers
          );
        }),
        tap(() => {
          this.enableStickerSelection = true;
        })
      )
      .subscribe((response) => {
        this.gifs = response;
        this.smallLoader = false;
        this.moreGifs = this.gifs.data.length == this.gifAmount;
      });
  }

  //trending function - gets trending gifs with the trending service
  showTrending() {
    this.currentSearch = '';
    this.enableStickerSelection = true;
    this.loader = true;
    this.trendingService.getTrending(this.showStickers).subscribe((result) => {
      this.gifs = result;
      this.loader = false;
    });
  }

  //search function - validates the search and makes a http get request
  search(q: string) {
    this.enableStickerSelection = true;
    if (this.currentSearch != q) {
      this.currentSearch = this.searchInput;
    }
    this.searchInput = '';
    this.loader = true;
    console.log(q);
    this.searchService
      .searchWithTrendingFallback(q, this.gifAmount, this.showStickers)
      .subscribe((result) => {
        this.gifs = result;
        this.moreGifs = this.gifs.data.length == this.gifAmount;
        this.loader = false;
      });
  }

  dynamicSearch(input: string) {
    this.search$.next(input);
  }

  favButtonPressed(id: string) {
    this.favoriteService.toggleFavorite(id);
  }

  setSearchMode(stickerMode: boolean) {
    this.showStickers = stickerMode;
    if (this.currentSearch) {
      this.search(this.currentSearch);
    } else {
      this.showTrending();
    }
  }

  //loads more gifs with the help of the load more service
  getMore() {
    document.getElementById('moreb').blur();
    this.loader = true;
    this.loadMore
      .load(
        this.gifs?.data.length,
        this.gifAmount,
        this.currentSearch,
        this.showStickers
      )
      .subscribe((result) => {
        this.moreGifs = result.data.length == this.gifAmount; //check if the amount ofgifs got returned that was requested - if not it means that ther are no more gifs left
        this.gifs.data = this.gifs.data.concat(result.data); //add the new results to the gif list
        this.loader = false;
      });
  }
}
