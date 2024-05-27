import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MachinesContainerComponent } from '../machines-container/machines-container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersContainerComponent } from '../orders-container/orders-container.component';
import { myConfig } from '../../config/myConfig';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [HeaderComponent, MachinesContainerComponent, OrdersContainerComponent],
  providers: [myConfig],
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
    private config: myConfig,
    private router: Router
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
    this.machines = await fetch(`${this.config.getServerUrl()}/${mc}/orders`).then(data => { return data.json(); });
    console.log(this.machines)
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
   this.router.navigate([`/dashboard/${this.mc}/${id}`]);
  }

  goBack() {
    this.router.navigate([`/machines/list`]);
  }
}
