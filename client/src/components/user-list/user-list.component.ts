import { Component } from '@angular/core';
import { myConfig } from '../../config/myConfig';
import { Router } from '@angular/router';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { HeaderComponent } from '../header/header.component';
import { UserContainerComponent } from '../user-container/user-container.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HeaderComponent, UserPopupComponent, UserContainerComponent, CdkDrag],
  providers: [myConfig, UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})  
export class UserListComponent {

  users: any[] = []
  mc: number = 0;
  rowMachinesList: any[] = [];
  pageTitle: string = "";

  popup: boolean = false;
  selectedId: number = 0;
  selectedUsername: string = "";

  constructor(
    private config: myConfig, 
    private router: Router,
    private userService: UserService
  ) {
    if(this.userService.isAuthenticated()) {
      this.router.navigate(['/machines/list']);
    }else{
      this.getUsers()
    }
  }

  async getUsers() {
    this.users = await fetch(`${this.config.getServerUrl()}/users`).then(data => { return data.json(); });
    console.log(this.users)
    let list = [];
    let currentIndex = 0;
    let totalItems = this.users.length;
    for(let user of this.users) {
      
      if(list.length === 6) {
        list = [];
      }

      list.push(user);

      if(list.length === 6 || (currentIndex === totalItems - 1)) {
        this.rowMachinesList.push(list);
      }
      currentIndex++;
    } 
  }

  loginWithUser(id: number, username: string) {
    console.log("popup")
    this.popup = true;
    this.selectedId = id;
    this.selectedUsername = username;
  }

  closePopup(event: any) {
    this.popup = false;
    if(this.userService.isAuthenticated()) {
      this.router.navigate(['/machines/list']);
    }
  }
}
