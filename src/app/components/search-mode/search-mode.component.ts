import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-mode',
  templateUrl: 'search-mode.component.html',
  styleUrls: ['search-mode.component.scss'],
})
export class SearchModeComponent {
  @Input() showStickers: boolean = false;
  @Output() showStickersChange = new EventEmitter<boolean>();

  @Input() enableStickerSelection: boolean = false;
  @Output() enableStickerSelectionChange = new EventEmitter<boolean>();

  //Change the current search mode
  ChangeSearchMode(mode: string) {
    console.log('Changed');
    if (mode == 'Gif') {
      //Set showSticker var depending on the received mode

      this.showStickersChange.emit(false);
    } else {
      this.showStickersChange.emit(true);
    }
  }
}
