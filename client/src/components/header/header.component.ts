import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() ordernumber: string = "";
  @Input() mcId: string = "";
  @Input() left_header_text: string = "";
  @Input() right_header_text: string = "";

  @Input() isTitle: boolean = false;
  @Input() pageTitle: string = "";

  currentDate = new Date();
  datePipe: DatePipe = new DatePipe('en-US');

  constructor() { }

  getCurrentdate() {
    return this.datePipe.transform(this.currentDate, "dd/MM/yyyy");
  }

  getCurrentHour() {
    return this.datePipe.transform(this.currentDate, "HH:mm:ss");
  }
}
