import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketValueComponent } from './socket-value/socket-value.component';
import { ChartComponent } from 'src/app/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent, ChartComponent, SocketValueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
