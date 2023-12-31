import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDisplayComponent } from './comic-display.component';

describe('ComicDisplayComponent', () => {
  let component: ComicDisplayComponent;
  let fixture: ComponentFixture<ComicDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
