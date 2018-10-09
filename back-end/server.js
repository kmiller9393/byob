const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`);
});
