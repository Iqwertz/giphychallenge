import { SearchComponent } from './components/search/search.component';
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
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faFrown, faHeart, fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GifComponent,
    SearchModeComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FontAwesomeModule, FormsModule],
  providers: [SearchService, FavoriteService, TrendingService, LoadMore],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faHeart);
  }
}
