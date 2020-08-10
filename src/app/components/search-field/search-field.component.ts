import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: 'search-field.component.html',
  styleUrls: ['search-field.component.scss'],
})
export class SearchFieldComponent {
  @Input() smallLoader: boolean = false;

  @Input() searchInput: string = '';
  @Output() searchInputChange = new EventEmitter<string>();

  @Output() triggerTrending = new EventEmitter();

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
