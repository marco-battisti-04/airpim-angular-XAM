import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [HeaderComponent, MachinesContainerComponent],
  templateUrl: './machine-list.component.html',
  styleUrl: './machine-list.component.css'
})
export class MachineListComponent {
  machines: any[] = []
  
  rowMachinesList: any[] = [];

  constructor() {
    this.getMachines();
  }

  async getMachines() {
    this.machines = await fetch('http://localhost:50000/machines').then(data => { return data.json(); });

    let orderList = [];
    let currentIndex = 0;
    let totalItems = this.machines.length;
    for(let machine of this.machines) {
      
      if(orderList.length === 4) {
        orderList = [];
      }

      orderList.push(machine);

      if(orderList.length === 4 || (currentIndex === totalItems - 1)) {
        this.rowMachinesList.push(orderList);
      }
      currentIndex++;
    } 
  }

  goToMachine(mc: number) {
    window.location.href = `/orders/${mc}/list`;
  }
}
