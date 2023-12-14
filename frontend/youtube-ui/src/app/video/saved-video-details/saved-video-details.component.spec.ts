import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedVideoDetailsComponent } from './saved-video-details.component';

describe('SavedVideoDetailsComponent', () => {
  let component: SavedVideoDetailsComponent;
  let fixture: ComponentFixture<SavedVideoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedVideoDetailsComponent]
    });
    fixture = TestBed.createComponent(SavedVideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
