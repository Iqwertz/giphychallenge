import { FavoriteService } from './../../services/favorites.service';
import { ResponseInterface } from './../../services/search.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  gifAmount: number = environment.gifAmount;
  gifs: ResponseInterface; //Var holding the http response
  loader: boolean = false;

  constructor(public favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.displayFavorites();
  }

  //favorites function - gets as favorites saved gifs ftrom the favorites service
  displayFavorites() {
    this.loader = true;
    this.favoriteService.getFavorites().subscribe((result) => {
      this.gifs = result;
      this.loader = false;
    });
  }

  favButtonPressed(id: string) {
    this.favoriteService.toggleFavorite(id);
  }
}
