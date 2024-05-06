import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-square',
  standalone: true,
  imports: [],
  templateUrl: './img-square.component.html',
  styleUrl: './img-square.component.css'
})
export class ImgSquareComponent {

  @Input() img: string = "../../assets/images/page_icons/user.png";
  @Input() text: string = "Undefined";
  @Input() invisible: boolean = false;
}
