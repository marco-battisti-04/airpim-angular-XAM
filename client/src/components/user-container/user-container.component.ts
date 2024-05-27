import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.css'
})
export class UserContainerComponent {
  @Input() id: string = "";
  @Input() username: string = "";
}
