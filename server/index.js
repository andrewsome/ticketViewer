const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios');
const config = require('./config.json');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(pino);

app.get('/api/ticket/listing', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const endpoint = `${config.ticket_api_host}tickets.json?page=${req.query.page}&per_page=${req.query.limit}`;
  axios({
    method: 'GET',
    url: endpoint,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    auth: {
      username: config.username,
      password: config.password
    }
  }).then(response => {
    res.send(JSON.stringify(response.data));
  }).catch(error => {
    res.send(JSON.stringify(error), 400);
  });

});
app.get('/api/ticket/detail/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const endpoint = `${config.ticket_api_host}tickets/${req.params.id}.json`;
  axios({
    method: 'GET',
    url: endpoint,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    auth: {
      username: config.username,
      password: config.password
    }
  }).then(response => {
    res.send(JSON.stringify(response.data));
  }).catch(error => {
    res.send(JSON.stringify(error), 400);
  });

});
app.listen(3001, () => console.log('Express server is running on localhost:3001'));