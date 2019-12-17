'use strict'

const express = require('express');
const app = express();

const ejs = require('ejs');

const superagent = require('superagent');

const PORT = 3000;

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.get('/', getForm);
// app.post('/searches', getBookInfo);

function getForm(request, response) {
  response.render('pages/index');
}

app.use('*', (request, response) => {
  response.status(404).send('page not found');
})

app.listen(PORT, () => console.log(`listing on ${PORT}`));

