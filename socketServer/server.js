//Load HTTP module
const http = require("http");
const io = require('socket.io');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const refreshFrequecy = 5000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

socketIO = io.listen(server);
socketIO.on('connection', (currentSocketClientInstance) => {
  console.log('A new client is connected.');
  currentSocketClientInstance.on('disconnect', () => {
    console.log('Socket client got disconnected!')
  });
});

let value = 100;
setInterval(() => {
  value += 20;
   console.log(`Current Value: ${value}`);
   socketIO.emit('data', { currentValue: value });
}, refreshFrequecy);


let chartData = JSON.parse(fs.readFileSync('./dataset.json', 'utf-8'));

let counter = 0;
setInterval(() => {
  counter++;
  let data = null;
  switch (counter) {
    case 1:
    data = chartData.firstDataSet;
      break;
    case 2:
    data = chartData.secondDataSet;
      break;
    case 3:
    data = chartData.thirdDataSet;
    // reset counter
    counter =0;
      break;
  }
  socketIO.emit('onChartData', { title: chartData.chartTitle, chartData: data });
}, refreshFrequecy);

process.on('exit', () => { });