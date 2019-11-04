import { Component } from '@angular/core';
import * as socketIOClient from 'socket.io-client';
import * as moment from 'moment';
import { serverURL } from '../app.config';

@Component({
  selector: 'app-socket-value',
  templateUrl: './socket-value.component.html',
  styleUrls: ['./socket-value.component.css']
})
export class SocketValueComponent {

  socketClient: any;
  currentValue: string;
  currentDateTime: string;

  isPrimary = true;

  constructor() {
    this.socketClient = socketIOClient(serverURL);

    this.socketClient.on('connect', () => {
      console.log('socket client connected');
    });

    this.socketClient.on('data', (res) => {
      this.isPrimary = !this.isPrimary;
      this.currentValue = res.currentValue;
      this.currentDateTime = moment().format('DD-MMM-YYYY HH:mm:ss a');
    });
    this.socketClient.on('connect_error', function (err) {
      // handle server error here
      console.log('Error connecting to server');
      alert('Error connecting to server');
    });
   
  }
}
