import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-machines-container',
  standalone: true,
  imports: [],
  templateUrl: './machines-container.component.html',
  styleUrl: './machines-container.component.css'
})
export class MachinesContainerComponent {

  @Input() id: number = 0;
  @Input() name: string = "";
  @Input() desc: string = "";


  constructor() {
    
  }
}
