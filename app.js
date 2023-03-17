const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression')

const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = app;
