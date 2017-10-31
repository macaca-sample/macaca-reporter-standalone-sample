'use strict';

const fs = require('fs');
const koa = require('koa');
const ipv4 = require('ipv4');
const path = require('path');
const detectPort = require('detect-port');
var server = require('http').createServer();
var io = require('socket.io')(server);

const app = koa();

const macacaReporterRender = require('macaca-reporter/lib/render');

var socketed = false;

app.use(function * () {

  const mockData = require('macaca-reporter/test/mock');

  console.log(JSON.stringify(mockData));

  var port = yield detectPort(56788);

  macacaReporterRender(mockData, {
    socket: {
      server: `http://localhost:${port}`
    }
  });
  this.body = fs.readFileSync(path.join(__dirname, 'reports', 'index.html'), 'utf8');

  if (socketed) {
    return;
  }

  socketed = true;

  server.listen(port);

  io.on('connection', function(socket) {

    console.log('socket connection');

    setInterval(() => {
      console.log('broadcast');
      mockData.stats.passes++;
      io.sockets.emit('update reporter', mockData);
    }, 1000);

    socket.on('disconnect', function() {

    });

  });

});

const port = 9001;

app.listen(port, () => {
  console.log(`server start at: http://${ipv4}:${port}`);
});
