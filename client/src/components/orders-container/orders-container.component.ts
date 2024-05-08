import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders-container',
  standalone: true,
  imports: [],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.css'
})
export class OrdersContainerComponent {
  
  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() desc: string = "";
  
}
