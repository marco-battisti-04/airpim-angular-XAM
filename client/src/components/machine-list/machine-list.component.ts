import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';
import { Router } from '@angular/router';
import { myConfig } from '../../config/myConfig';

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

  constructor(
    private router: Router,
    private config: myConfig
  ) {
    this.getMachines();
  }

  async getMachines() {
    this.machines = await fetch(this.config.getServerUrl() + '/machines').then(data => { return data.json(); });

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
    this.router.navigate([`orders/${mc}/list`]);
    // window.location.href = `/orders/${mc}/list`;
  }
}
