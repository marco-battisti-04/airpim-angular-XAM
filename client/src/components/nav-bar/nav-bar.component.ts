import { Component } from '@angular/core';
import { ImgSquareComponent } from '../img-square/img-square.component';
import { UserService } from '../../services/userService';
import { myConfig } from '../../config/myConfig';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ImgSquareComponent],
  providers: [myConfig, UserService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor (
    private userService: UserService
  ) {

  }
  logout() {
    this.userService.logout();
    window.location.reload();
  }
}
