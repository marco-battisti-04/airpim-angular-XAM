import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, KeyValueTextComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
