import { Observable } from 'rxjs';
import { ResponseInterface } from './search.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TrendingService {
  constructor(private httpClient: HttpClient) {}

  getTrending(stickers: boolean): Observable<ResponseInterface> {
    //gets the trending Gifs with the trending api from giphy
    const dir: string = stickers ? 'stickers' : 'gifs';

    return this.httpClient.get<ResponseInterface>(
      `https://api.giphy.com/v1/${dir}/trending?api_key=vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8`
    );
  }
}
