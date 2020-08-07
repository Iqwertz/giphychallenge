import { ResponseInterface } from './search.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadMore {
  constructor(private httpClient: HttpClient) {}

  //makes a http request to load more gifs from the api
  load(
    index: number, //index of the last loaded gif
    amount: number, //amount of gifs to load
    q: string, //search query
    stickers: boolean
  ): Observable<ResponseInterface> {
    const dir: string = stickers ? 'stickers' : 'gifs';

    if (q === '') {
      //if the search query is empty load trending gifs
      return this.httpClient.get<ResponseInterface>(
        `https://api.giphy.com/v1/${dir}/trending?api_key=vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8&limit=${amount}&offset=${index}`
      );
    } else {
      return this.httpClient.get<ResponseInterface>(
        `https://api.giphy.com/v1/${dir}/search?api_key=vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8&q=${q}&limit=${amount}&offset=${index}`
      );
    }
  }
}
