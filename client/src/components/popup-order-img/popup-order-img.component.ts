import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup-order-img',
  standalone: true,
  imports: [],
  templateUrl: './popup-order-img.component.html',
  styleUrl: './popup-order-img.component.css'
})
export class PopupOrderImgComponent implements OnInit {

  @Input() img: string = "../../assets/images/img_test_1920x1080.jpg";

  @Output() popup = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit(): void {
  }

  closePopup() {
    this.popup.emit(false);
  }
  
}
