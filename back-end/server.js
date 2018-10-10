const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`);
});

app.locals.jobsData = require('./utils/jobsData.json');
app.locals.jobTypesData = require('./utils/jobTypesData.json');

app.get('/api/v1/jobs', (request, response) => {
  database('jobs')
    .select()
    .then(jobs => {
      response.status(200).json(jobs);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/job-types', (request, response) => {
  database('job_types')
    .select()
    .then(job_types => {
      response.status(200).json(job_types);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/jobs/:id', (request, response) => {
  const id = request.params.id;

  database('jobs')
    .where('id', id)
    .del()
    .then(() => {
      response
        .status(202)
        .json({ id })
        .catch(error => {
          response.status(500).json({ error });
        });
    });
});

module.exports = app;
