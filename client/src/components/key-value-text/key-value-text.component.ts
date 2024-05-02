import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-value-text',
  standalone: true,
  imports: [],
  templateUrl: './key-value-text.component.html',
  styleUrl: './key-value-text.component.css'
})
export class KeyValueTextComponent {

  @Input() key: string = "";
  @Input() value: string = "";

  constructor() {
    
  }
}
