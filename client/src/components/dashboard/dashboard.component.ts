import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { KeyValueTextComponent } from '../key-value-text/key-value-text.component';
import { IMAGE_CONFIG } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ImgSquareComponent } from '../img-square/img-square.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, KeyValueTextComponent, ImgSquareComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent { }
