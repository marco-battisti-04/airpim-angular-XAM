import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {CdkDrag} from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-popup-order-img',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './popup-order-img.component.html',
  styleUrl: './popup-order-img.component.css'
})
export class PopupOrderImgComponent {

  @Input() img: string = ""; // TODO: passare l'immagine
  @Output() popup = new EventEmitter<boolean>();

  SERVER_URL = "http://localhost:50000";
  
  @ViewChild('container') container!: ElementRef;
  @ViewChild('image') image!: ElementRef;

  constructor(private sanitizer: DomSanitizer) { 
  }

  closePopup() {
    this.popup.emit(false);
  }

  getImageSrc() {
    console.log(this.img)
    if(this.img === "") {
      return "../../assets/images/backgrouond.jpg";
    }else {
      // FIXME: questo passa l'immagine intera
      // const imageBase64 = this.img;
      // const imageUrl = 'data:image/jpeg;base64,' + imageBase64;
      // this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      // console.log(this.imageSrc)

      let imgsrc = `${this.SERVER_URL}/images/${this.img}`
      return imgsrc;
    }
  }


  moveImage(event: MouseEvent) {
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - containerRect.left;
    const offsetY = event.clientY - containerRect.top;

    this.image.nativeElement.style.left = offsetX + 'px';
    this.image.nativeElement.style.top = offsetY + 'px';
  }
}
