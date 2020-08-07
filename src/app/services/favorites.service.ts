import { ResponseInterface } from '../services/search.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FavoriteService {
  constructor(private httpClient: HttpClient) {}

  favGifIdsString: string;

  defaultRes: ResponseInterface = {
    data: [],
  };

  getFavorites(): Observable<ResponseInterface> {
    //Gets all saved gifs and displays them
    this.favGifIdsString = localStorage.getItem('favGifIds'); //Get the ids from localStorage
    if (this.favGifIdsString) {
      //Check if there are favorite Gifs
      return this.httpClient.get<ResponseInterface>(
        `https://api.giphy.com/v1/gifs?api_key=vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8&ids=${this.favGifIdsString}` //Get Gifs with the ids api : https://developers.giphy.com/docs/api/endpoint#get-gifs-by-id
      );
    } else {
      alert('No favorite Gifs');
      return of(this.defaultRes);
    }
  }

  hasFavorite(id: string) {
    return localStorage.getItem('favGifIds')?.includes(id);
  }

  toggleFavorite(id: string) {
    if (this.hasFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  addFavorite(id: string) {
    let favGifIds: string[] = this.getFavoritesArray(); //Create Array holding the ids as array
    favGifIds.push(id); //if liked push the new id to the array
    localStorage.setItem('favGifIds', favGifIds.toString()); //Create new String from id array and save it in the localStorage
  }

  removeFavorite(id: string) {
    let favGifIds: string[] = this.getFavoritesArray(); //Create Array holding the ids as array
    favGifIds = favGifIds.filter((e) => e !== id); //if unlicked remove the id from the array / from: https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
    localStorage.setItem('favGifIds', favGifIds.toString()); //Create new String from id array and save it in the localStorage
  }

  getFavoritesArray() {
    this.favGifIdsString = localStorage.getItem('favGifIds'); //Get the ids from localStorage
    if (this.favGifIdsString) {
      //Checks if there are currently ids in the storage
      return this.favGifIdsString.split(','); //if there are split the string into array
    } else {
      return []; //if not create an empty array
    }
  }
}
