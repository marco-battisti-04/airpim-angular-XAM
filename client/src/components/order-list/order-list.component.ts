import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';
import { ActivatedRoute } from '@angular/router';
import { OrdersContainerComponent } from '../orders-container/orders-container.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [HeaderComponent, MachinesContainerComponent, OrdersContainerComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  machines: any[] = []
  mc: number = 0;
  rowMachinesList: any[] = [];
  pageTitle: string = "";

  constructor(
    private route: ActivatedRoute,   
  ) {

    this.route.paramMap.subscribe(params => {
      const mc = params.get('mc');

      try {
        this.mc = Number(mc);
        this.pageTitle = "Orders Of Machine: " + this.mc;
        this.getMachines(this.mc);
      }catch(error) {
        console.error(error);
      }
    });
  }

  async getMachines(mc: number) {
    this.machines = await fetch(`http://10.0.0.152:50000/${mc}/orders`).then(data => { return data.json(); });

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

  goToOrder(id: number) {
    window.location.href = `/dashboard/${this.mc}/${id}/`;
  }

  goBack() {
    window.location.href = `/machines/list`;
  }
}
