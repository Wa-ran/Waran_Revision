const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/user');
const gpm = require('./routes/gpm');
const fs = require('fs');
const path = require('path');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Parser pour exploiter les données plus facilement
app.use(bodyParser.json());

app.use('/images',
(req, res, next) => {
  fs.access('./images/' + req.path, error => {
    if (error) {
      if (req.path.match(/(avatar)/)) {
        if (req.path.match(/(mini)/)) res.redirect('/images/avatars/user404_mini.webp')
        else res.redirect('/images/avatars/user404.webp')
        next()
      }
      else {
        res.sendStatus(204)
      }
    } else {
      next()
    }
  })
},
express.static(path.join(__dirname, 'images')));

app.use('/user', user);
app.use('/gpm', gpm);

module.exports = app;