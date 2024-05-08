import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-order-img',
  standalone: true,
  imports: [],
  templateUrl: './popup-order-img.component.html',
  styleUrl: './popup-order-img.component.css'
})
export class PopupOrderImgComponent implements OnInit {

  @Input() img: string = "";
  @Output() popup = new EventEmitter<boolean>();

  imageSrc!: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { 
  }
  ngOnInit(): void {
  }

  closePopup() {
    this.popup.emit(false);
  }

  getImageSrc() {
    console.log(this.img)
    if(this.img === "") {
      return "../../assets/images/backgrouond.jpg";
    }else {
      const imageBase64 = this.img;
      const imageUrl = 'data:image/jpeg;base64,' + imageBase64;
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      console.log(this.imageSrc)
      return this.imageSrc;
    }
  }
}
