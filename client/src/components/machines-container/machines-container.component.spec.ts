import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesContainerComponent } from './machines-container.component';

describe('MachinesContainerComponent', () => {
  let component: MachinesContainerComponent;
  let fixture: ComponentFixture<MachinesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachinesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachinesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
