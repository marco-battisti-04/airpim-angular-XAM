import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { IMAGE_CONFIG } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ImgSquareComponent } from '../img-square/img-square.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, KeyValueTextComponent, ImgSquareComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ordernumber: string = "";
  otherId: string = "";
  left_header_text: string = "";
  right_header_text: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

    this.route.paramMap.subscribe(params => {
      const mc = params.get('mc');
      const orderId = params.get('id');
      
      try {
        let mc2Number = Number(mc);
        let OrderId2Number = Number(orderId);

        this.getOrder(mc2Number, OrderId2Number);
      }catch(error) {
        console.error(error);
      }
    });
  }

  /**
   * prende i dati degli ordini
   * @param mc la macchina dove si trova l'ordine
   * @param orderId l'id dell'ordine
   */
  async getOrder(mc: number, orderId: number) {

    /*let response = await this.http.get(`localhost:50000/order/${mc}/${orderId}`).subscribe((data: any) => {
      return data;
    })*/

    this.left_header_text = "test modificato dopo";
    this.right_header_text = "test2 modificato dopo";
  }
}
