import { SearchFieldComponent } from './components/search-field/search-field.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchModeComponent } from './components/search-mode/search-mode.component';
import { LoadMore } from './services/load-more.service';
import { TrendingService } from './services/trending.service';
import { FavoriteService } from './services/favorites.service';
import { SearchService } from './services/search.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GifComponent } from './components/gif/gif.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faFrown, faHeart, fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { FavoritesResultsComponent } from './components/favorites-results/favorites-results.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: FavoritesResultsComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    GifComponent,
    SearchModeComponent,
    FavoritesResultsComponent,
    SearchComponent,
    SearchFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SearchService, FavoriteService, TrendingService, LoadMore],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faHeart);
  }
}
