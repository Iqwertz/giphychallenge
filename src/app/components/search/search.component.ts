import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
})
export class SearchComponent {
  @Input() smallLoader: boolean = false;

  @Input() searchInput: string = '';
  @Output() searchInputChange = new EventEmitter<string>();

  @Output() triggerTrending = new EventEmitter();
  @Output() triggerFavorites = new EventEmitter();

  @Output() triggerDynamicSearch = new EventEmitter<string>();

  @Output() triggerSearch = new EventEmitter<string>();

  onInputChange(input: string) {
    this.triggerDynamicSearch.emit(input);
    //this.search$.next(input);
  }

  search(q: string) {
    this.triggerSearch.emit(q);
  }
}
