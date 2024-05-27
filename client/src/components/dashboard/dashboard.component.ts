import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { IMAGE_CONFIG } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ImgSquareComponent } from '../img-square/img-square.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupOrderImgComponent } from '../popup-order-img/popup-order-img.component';
import { AdvanceStatusPopupComponent } from '../advance-status-popup/advance-status-popup.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { myConfig } from '../../config/myConfig';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, 
    KeyValueTextComponent, 
    ImgSquareComponent, 
    PopupOrderImgComponent, 
    AdvanceStatusPopupComponent,

    CdkDrag
  ],
  providers: [myConfig],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})  
export class DashboardComponent {

  // HEADER VARIABLES
  ordernumber: string = "0";
  mcId: string = "";
  left_header_text: string = "";
  right_header_text: string = "";

  // POPUP VARIABLES
  isPopupVisible: boolean = false;
  isFormPopupVisible: boolean = false;
  popupImg: string = "";

  
  order: any = {
    mc: 0,
    id: 0,
    ag: 0,
    bez_ag: "undefined",
    lagerplatz: "undefined",
    programm: "undefined",
    status: "undefined",
    progress: 0,
    total: 0,
    gefertigt: 0,
    aussschuss: 0,
    text_left: "undefined",
    text_right: "undefined",
    image: ""
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private config: myConfig 
  ) {

    this.route.paramMap.subscribe(params => {
      const mc = params.get('mc');
      const orderId = params.get('id');

      if(mc != null && orderId != null) {
        this.ordernumber = orderId;
        this.mcId = mc;

        try {
          let mc2Number = Number(mc);
          let OrderId2Number = Number(orderId);
  
          this.getOrder(mc2Number, OrderId2Number);
        }catch(error) {
          console.error(error);
        }
      }
    });
  }

  async getOrder(mc: number, orderId: number) {
    this.http.get(`${this.config.getServerUrl()}/order/${mc}/${orderId}`).subscribe((data: any) => {
        this.order = data;
    })
  }

  getPercentage(progress: number, total: number) {
    const percentage = (progress / total) * 100;
    return ( `${percentage.toFixed(2)}%`);
  }

  openPopup() {
    this.isPopupVisible = true;
    this.isFormPopupVisible = false;
  }

  closePopup(event: any) {
    this.isPopupVisible = event.open;
    this.refreshData();
  }

  refreshData() {
    this.http.get(`${this.config.getServerUrl()}/order/${this.order.mc}/${this.order.id}`).subscribe((data: any) => {
        this.order = data;
    })
  }

  openStatusForm() {
    this.isPopupVisible = false;
    this.isFormPopupVisible = true;
  }

  closeStatusForm(event: any) {
    this.isFormPopupVisible = event;
  }

  redirect(location: string) {

    switch(location) {
      case 'orders': {
        this.router.navigate([`orders/${this.mcId}/list`]);
        break;
      }
      case 'machines': {
        this.router.navigate([`machines/list`]);
        break;
      }
    }
  }
}
