import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import * as socketIOClient from 'socket.io-client';
import * as moment from 'moment';
import { serverURL } from '../app.config';
import { chartColours } from './chart-colour';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('barChart', null) private barChartRef;
  barChartData: any;
  chartTitle: string;
  socketClient: any;
  socketResponse: any;
  currentDateTime: string;

  getData() {
    this.socketClient = socketIOClient(serverURL);
    this.socketClient.on('connect', () => {
      console.log('socket client connected');
    });

    this.socketClient.on('onChartData', (res) => {
      this.socketResponse = res;
      debugger;
      this.renderChart();
      this.currentDateTime = moment().format('DD-MMM-YYYY HH:mm:ss a');
    });

    this.socketClient.on('connect_error', function (err) {
      // handle server error here
      console.log('Error connecting to server');
      alert('Error connecting to server');
    });
  }

  ngOnInit() {
    this.getData();
  }

  renderChart() {
    this.chartTitle = this.socketResponse.title;
    this.barChartData = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.socketResponse.chartData.labels,
        datasets: [{
          data: this.socketResponse.chartData.data,
          backgroundColor: chartColours,
          borderColor: chartColours,
          borderWidth: 0
        }]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }, gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        }
      }
    });
  }
}