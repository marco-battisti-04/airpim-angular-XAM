import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceStatusPopupComponent } from './advance-status-popup.component';

describe('AdvanceStatusPopupComponent', () => {
  let component: AdvanceStatusPopupComponent;
  let fixture: ComponentFixture<AdvanceStatusPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceStatusPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
