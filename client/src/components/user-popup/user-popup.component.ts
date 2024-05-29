import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.css'
})
export class UserPopupComponent {

  @Input() id!: number;
  @Input() username!: string;

  @Output() popup = new EventEmitter<boolean>();

  @ViewChild('input') input!: ElementRef;

  form!: FormGroup;

  error: boolean = false;
  errorMessage: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    if(this.userService.isAuthenticated()) {
      this.router.navigate(['/machines/list']);
    }
  }
  
  closePopup() {
    this.popup.emit(false);
  }

  async submitForm(event: any) {
    console.log(this.input.nativeElement.value);
    
    let response = await this.userService.login(this.id, this.input.nativeElement.value)
    this.input.nativeElement.value = "";
    
    if(response.status == "ok") {
      this.closePopup();
    }else {
      this.error = true;
      this.errorMessage = response.status
    }
  }
}

