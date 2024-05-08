import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-advance-status-popup',
  standalone: true,
  imports: [KeyValueTextComponent],
  templateUrl: './advance-status-popup.component.html',
  styleUrl: './advance-status-popup.component.css'
})
export class AdvanceStatusPopupComponent {

  @Input() order: any = {};
  // quantity: number = 0;

  quantity = new FormControl('');

  @Output() popup = new EventEmitter<boolean>();
  constructor() {
    
  }

  closePopup() {
    this.popup.emit(false);
  }

  getProgressOption() {
    console.log()
    return ( this.order.total - this.order.progress );
  }

  getPercentage(progress: number, total: number) {
    const percentage = (progress / total) * 100;
    return ( `${percentage.toFixed(2)}%`);
  }

  submitForm(event: any) {
    event.preventDefault();

    console.log(this.quantity.value);
    // event.
  }
}
