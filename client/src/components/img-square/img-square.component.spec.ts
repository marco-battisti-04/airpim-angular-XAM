import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSquareComponent } from './img-square.component';

describe('ImgSquareComponent', () => {
  let component: ImgSquareComponent;
  let fixture: ComponentFixture<ImgSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgSquareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
