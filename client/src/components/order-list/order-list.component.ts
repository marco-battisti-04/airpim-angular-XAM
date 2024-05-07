import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { get } from 'http';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [HeaderComponent, MachinesContainerComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  machines: any[] = []
  mc: number = 0;
  rowMachinesList: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,   
  ) {

    this.route.paramMap.subscribe(params => {
      const mc = params.get('mc');

      try {
        this.mc = Number(mc);
      }catch(error) {
        console.error(error);
      }
    });


    this.getMachines();
  }

  async getMachines() {
    this.machines = await fetch('http://localhost:50000/orders').then(data => { return data.json(); });

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
    window.location.href = `/dashboard/${this.mc}/${id}/`;
  }
}
