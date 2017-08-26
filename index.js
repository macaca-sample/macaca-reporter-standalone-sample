'use strict';

const fs = require('fs');
const koa = require('koa');
const ipv4 = require('ipv4');
const path = require('path');

const app = koa();

const macacaReporterRender = require('macaca-reporter/lib/render');

app.use(function * () {
  const mockData = require('macaca-reporter/test/mock');
  console.log(JSON.stringify(mockData));
  macacaReporterRender(mockData, {});
  this.body = fs.readFileSync(path.join(__dirname, 'reports', 'index.html'), 'utf8');
});

const port = 9001;

app.listen(port, () => {
  console.log(`server start at: http://${ipv4}:${port}`);
});
