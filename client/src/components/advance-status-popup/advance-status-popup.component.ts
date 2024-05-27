import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MachineListComponent } from '../machine-list/machine-list.component';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';
import { HttpClient } from '@angular/common/http';
import { myConfig } from '../../config/myConfig';

@Component({
  selector: 'app-advance-status-popup',
  standalone: true,
  imports: [
    KeyValueTextComponent,
    FormsModule,
    ReactiveFormsModule,
    MachinesContainerComponent
  ],
  providers: [myConfig],
  templateUrl: './advance-status-popup.component.html',
  styleUrl: './advance-status-popup.component.css'
})
export class AdvanceStatusPopupComponent implements OnInit {

  @Input() order: any = {};
  @Output() popup = new EventEmitter<any>();

  @ViewChild('input') input!: ElementRef;
  
  form!:FormGroup
  error: boolean = false;
  errorMessage: string = "";
  

  selectedRadioOption: string = this.order.phase;
  addedQuantity: number = 0;
  constructor(private http: HttpClient, private config: myConfig) {
    
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

  async submitForm(event: any) {
    console.log(this.addedQuantity)
    let quantityUpdate = await fetch(`${this.config.getServerUrl()}/order/${this.order.mc}/${this.order.id}/update`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      // body: JSON.stringify({update: this.order})
      body: JSON.stringify({added: this.addedQuantity})
    }).then(data => { return data.json(); });
    let phaseUpdate;
    if(this.selectedRadioOption != this.order.phase) {
      phaseUpdate = await fetch(`${this.config.getServerUrl()}/order/${this.order.mc}/${this.order.id}/phase`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({phase: this.form.get('radio')?.value})
      }).then(data => { return data.json(); });
    }

    if(quantityUpdate.status == 'ok' || phaseUpdate.status == 'ok') {
      this.http.get(`${this.config.getServerUrl()}/order/${this.order.mc}/${this.order.id}`).subscribe((data: any) => {
        this.order = data;
      })  
    }
  }

  async updateQuantity(quantity: number) {

    this.addedQuantity += quantity;
    this.input.nativeElement.value = '';
    console.log("DONE")
  }

  switchPhase(event: any) {

    if(this.form.get('radio')?.value != null || this.form.get('radio')?.value != "") {
      this.selectedRadioOption = this.form.get('radio')?.value;
    }
  }

  addQuantity(event: any) {
    if(this.form.get('quantity')?.value != "") {

      this.error = false;
      this.errorMessage = "";
      
      try {
        let number = Number(this.form.get('quantity')?.value);

        if(Number.isNaN(number)) {
          this.error = true;
          this.errorMessage = "Please enter a number for the quantity";
        }else {
          this.updateQuantity(number);
          console.log(number);
          
        }
      }catch(error) {
        this.error = true;
        this.errorMessage = "Please enter a number for the quantity";
      }
    }else {
      this.error = true;
      this.errorMessage = "Please enter a quantity";
    }
  }
}
