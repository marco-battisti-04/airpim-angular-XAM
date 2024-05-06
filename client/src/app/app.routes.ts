import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrderListComponent } from '../components/order-list/order-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: OrderListComponent
    },
    {
        path: 'dashboard/:mc/:id',
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: 'list'
    }
];
