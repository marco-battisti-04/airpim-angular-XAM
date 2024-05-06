import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrderImgComponent } from './popup-order-img.component';

describe('PopupOrderImgComponent', () => {
  let component: PopupOrderImgComponent;
  let fixture: ComponentFixture<PopupOrderImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupOrderImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupOrderImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
