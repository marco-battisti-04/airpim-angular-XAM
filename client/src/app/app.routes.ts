import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrderListComponent } from '../components/order-list/order-list.component';
import { MachineListComponent } from '../components/machine-list/machine-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'machines/list',
        pathMatch: 'full'
    },
    {
        path: 'machines/list',
        component: MachineListComponent
    },
    {
        path: 'orders/:mc/list',
        component: OrderListComponent   
    },
    {
        path: 'dashboard/:mc/:id',
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: 'machines/list'
    }
];
