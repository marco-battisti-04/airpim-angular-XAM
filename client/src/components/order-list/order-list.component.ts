import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { get } from 'http';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: any[] = []

  constructor(private http: HttpClient) {
    this.getOrders();
  }

  async getOrders() {
    this.http.get('http://localhost:50000/ordini').subscribe((data: any) => {
      this.orders = data;
    })
  }
}
