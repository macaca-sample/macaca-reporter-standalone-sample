'use strict';

const koa = require('koa');
const ipv4 = require('ipv4');

const app = koa();

const macacaReporter = require('macaca-reporter');

app.use(function * () {
  console.log(macacaReporter);
  this.body = 'Hi, it works';
});

const port = 9001;

app.listen(port, () => {
  console.log(`server start at: http://${ipv4}:${port}`);
});
