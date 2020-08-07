import { TrendingService } from './trending.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface ResponseInterface {
  //Interface holding the api structure
  data: DataResponseInterface[];
}
export interface DataResponseInterface {
  //subInterface with the important api vars
  title: string;
  url: string;
  id: string;
}

@Injectable()
export class SearchService {
  constructor(
    private httpClient: HttpClient,
    private trendingService: TrendingService
  ) {}

  defaultRes: ResponseInterface = {
    data: [],
  };

  searchCache = new Map<string, ResponseInterface>();

  //search function - validates the search and makes a http get request
  searchWithTrendingFallback(
    q: string,
    n: number,
    stickers: boolean
  ): Observable<ResponseInterface> {
    if (q != '' && q != undefined) {
      return this.search(q, n, stickers);
    } else {
      return this.trendingService.getTrending(stickers);
    }
  }

  search(
    q: string,
    n: number,
    stickers: boolean
  ): Observable<ResponseInterface> {
    console.log('Search: ', q);
    const dir: string = stickers ? 'stickers' : 'gifs';
    if (this.searchIsValid(q)) {
      if (this.searchCache.has(q + dir)) {
        return of(this.searchCache.get(q + dir));
      } else {
        return this.httpClient
          .get<ResponseInterface>(
            `https://api.giphy.com/v1/${dir}/search?api_key=vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8&q=${q}&limit=${n}`
          )
          .pipe(
            tap((response) => {
              this.searchCache.set(q + dir, response);
            })
          );
      }
    } else {
      console.log('Search not Valid'); //Log error if search is invalid
      return of(this.defaultRes);
    }
  }

  //Test if the Search var is valid
  searchIsValid(search: string) {
    if (search) {
      return true;
    }
    return false;
  }
}
