import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrderListComponent } from '../components/order-list/order-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'machines/list',
        pathMatch: 'full'
    },
    {
        path: 'machines/list',
        component: OrderListComponent
    },
    {
        path: 'orders/:mc/list',
        component: DashboardComponent
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
