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
app.post('/searches', getBookInfo);

function getForm(request, response) {
  response.render('pages/index');
}

function getBookInfo(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q='

  let typeOfSearch = request.body.search[1];
  let searchCriteria = request.body.search[0];
  console.log(request)

  if (typeOfSearch === 'author') {
    url += `+inauthor:${searchCriteria}`;
  }

  if (typeOfSearch === 'title') {
    url += `+intitle:${searchCriteria}`;
  }

  superagent.get(url)
    .then(res => {
      console.log(res.body.items)
      let bookArr = res.body.items.map(book => {
        return new Book(book.volumeInfo)
      });
      response.send(bookArr)
      // result.render('pages/searches/show');
    })
}

function Book(bookObj) {
  const placeHolderImage = `https://i.imgur.com/J5LVHEL.jpg`;
  this.title = bookObj.title || 'no title available'
  this.author = bookObj.authors
  this.description = bookObj.description
  //   this.isbn = 
}



app.use('*', (request, response) => {
  response.status(404).send('page not found');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

