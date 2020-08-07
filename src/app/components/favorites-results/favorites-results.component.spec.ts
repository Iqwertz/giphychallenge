import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesResultsComponent } from './favorites-results.component';

describe('FavoritesResultsComponent', () => {
  let component: FavoritesResultsComponent;
  let fixture: ComponentFixture<FavoritesResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
