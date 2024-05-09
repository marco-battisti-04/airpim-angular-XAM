import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-advance-status-popup',
  standalone: true,
  imports: [KeyValueTextComponent,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './advance-status-popup.component.html',
  styleUrl: './advance-status-popup.component.css'
})
export class AdvanceStatusPopupComponent implements OnInit {

  @Input() order: any = {};
  @Output() popup = new EventEmitter<any>();
  
  form!:FormGroup
  error: boolean = false;
  errorMessage: string = "";
  

  selectedRadioOption: string = this.order.phase;
  constructor() {
    
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      'quantity':new FormControl(''),
      'radio':new FormControl(''),
    })
  }

  closePopup() {
    this.popup.emit({
      open: false,
      order: this.order
    });
  }

  getProgressOption() { 
    return ( this.order.total - this.order.progress );
  }

  getPercentage(progress: number, total: number) {
    const percentage = (progress / total) * 100;
    return ( `${percentage.toFixed(2)}%`);
  }

  submitForm(event: any) {

    let quantity = this.form.get('quantity')?.value;
    let quantity2Number;
    console.log( this.form.get('radio')?.value)

    if(quantity === "") {
      this.error = true;
      this.errorMessage = "Please insert a number between 0 and " + (this.order.total - this.order.progress);
    }else {
      try {
        quantity2Number = Number(quantity);
  
        this.error = false;
        this.errorMessage = "";
        
        if((quantity2Number + this.order.progress) <= this.order.total) {
          this.updateQuantity(quantity2Number);
        }else {
          this.error = true;
          this.errorMessage = "Please insert a number between 0 and " + (this.order.total - this.order.progress);
        }
      }catch (error) {
        this.error = true;
        this.errorMessage = "Please insert a number";
      }
    }
  }

  async updateQuantity(quantity: number) {
    this.order.progress += quantity;

    if(this.order.progress === this.order.total) {
      this.order.status = "Gefertigt";
    }

    fetch(`http://localhost:50000/order/${this.order.mc}/${this.order.id}/update`, {

      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      // body: JSON.stringify({update: this.order})
      body: JSON.stringify({progress: this.order.progress, status: this.order.status})
    })
  }

  switchPhase(event: any) {

    this.form.get('radio')?.value
    if(this.form.get('radio')?.value != "") {
      fetch(`http://localhost:50000/order/${this.order.mc}/${this.order.id}/phase`, {

      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      // body: JSON.stringify({update: this.order})
      body: JSON.stringify({phase: this.form.get('radio')?.value})
    })
    }else {
      this.error = true;
      this.errorMessage = "Please select a phase";
    }
    
  }
}
