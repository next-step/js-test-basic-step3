const Bundler = require('parcel-bundler');
const app = require('express')();

const file = './serverCounter.html';
const options = { watch: true };
const { createCounter } = require('./src/backup/counter');

const bundler = new Bundler(file, options);

const counter = createCounter({
  initVal: 10,
  min: 8,
  max: 12
});

function response() {
  return {
    value: counter.val(),
    isMax: counter.isMax(),
    isMin: counter.isMin()
  };
}

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.get('/counter', (req, res) => {
  res.send(response());
});

app.put('/counter/inc', (req, res) => {
  counter.inc();
  res.send(response());
});

app.put('/counter/dec', (req, res) => {
  counter.dec();
  res.send(response());
});

app.use(bundler.middleware());

app.listen(1234);
