import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '../../node_modules/@angular/core';

import { ChartComponent } from './chart/chart.component';
import { SocketValueComponent } from './socket-value/socket-value.component';

export const routes: Routes = [
  {
    path: 'socketValue',
    component: SocketValueComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}