import { LoadMore } from './services/load-more.service';
import { TrendingService } from './services/trending.service';
import { FavoriteService } from './services/favorites.service';
import { ResponseInterface, SearchService } from './services/search.service';
import { Component, OnInit } from '@angular/core';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchInput: string; //dualBinded var holding the searfield input
  gifs: ResponseInterface; //Var holding the http response
  gifAmount: number = 25;
  currentSearch: string = '';
  search$ = new Subject<string>();
  moreGifs: boolean = true;
  loader: boolean = false;
  smallLoader: boolean = false;
  showStickers: boolean = false;
  enableStickerSelection: boolean = true;
  searchDelay: number = 150;
  faFrown = faFrown;

  constructor(
    private searchService: SearchService,
    public favoriteService: FavoriteService,
    private trendingService: TrendingService,
    private loadMore: LoadMore
  ) {}

  ngOnInit() {
    /*  console.log('init'); //log init (for debugging)
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
      });*/
  }

  //search function - validates the search and makes a http get request
  /*search(q: string) {
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
  }*/

  //trending function - gets trending gifs with the trending service
  /*  showTrending() {
    this.currentSearch = '';
    this.enableStickerSelection = true;
    this.loader = true;
    this.trendingService.getTrending(this.showStickers).subscribe((result) => {
      this.gifs = result;
      this.loader = false;
    });
  }*/

  /*
  favButtonPressed(id: string) {
    this.favoriteService.toggleFavorite(id);
  }
*/

  //favorites function - gets as favorites saved gifs ftrom the favorites service
  /*displayFavorites() {
    this.enableStickerSelection = false;
    this.moreGifs = false;
    this.loader = true;
    this.favoriteService.getFavorites().subscribe((result) => {
      this.gifs = result;
      this.loader = false;
    });
  }*/

  //loads more gifs with the help of the load more service
  getMore() {
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

  /*
  setSearchMode(stickerMode: boolean) {
    this.showStickers = stickerMode;
    if (this.currentSearch) {
      this.search(this.currentSearch);
    } else {
      this.showTrending();
    }
  }*/

  /*
  dynamicSearch(input: string) {
    this.search$.next(input);
  }
  */
}
