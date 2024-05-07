import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [],
  templateUrl: './machine-list.component.html',
  styleUrl: './machine-list.component.css'
})
export class MachineListComponent {
  machines: any[] = []
  
  rowMachinesList: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router 
  ) {
    this.getMachines();
  }

  async getMachines() {
    this.machines = await fetch('http://localhost:50000/machines').then(data => { return data.json(); });

    let orderList = [];
    let currentIndex = 0;
    let totalItems = this.machines.length;
    // console.log(this.machines)
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

    console.log(this.rowMachinesList)

  }

  goToMachine(id: number) {
    console.log(`/dashboard/${id}`)
    window.location.href = `/dashboard/${id}/list`;
  }
}
