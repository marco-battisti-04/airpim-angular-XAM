import { Component } from '@angular/core';
import { ImgSquareComponent } from '../img-square/img-square.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ImgSquareComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
