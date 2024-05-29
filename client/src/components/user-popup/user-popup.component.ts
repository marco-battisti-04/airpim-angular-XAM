import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { myConfig } from '../../config/myConfig';

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
    private http: HttpClient,
    private config: myConfig,
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

    let json = { 
      "id": this.id, 
      "pin": this.input.nativeElement.value 
    }

    this.http.post(`${this.config.getServerUrl()}/login`, json).subscribe(
      (response: any) => {
        this.input.nativeElement.value = "";
        console.log(response)
        
        if(response.status === 'ok') {
          localStorage.setItem('user', this.id + "");
          this.closePopup();
        }else {
          this.error = true;
          this.errorMessage = "Wrong pin";
        }
      }
    )
  }
}

