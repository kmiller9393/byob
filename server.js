const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3010);

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`);
});

app.get('/', (request, response) => {
  response.send('Hello Travis CI.');
});

app.get('/api/v1/jobs', (request, response) => {
  const query = request.query;

  if (query.company) {
    return database('jobs')
      .where('company', 'like', `%${query.company}%`)
      .then(job => {
        response.status(200).json(job);
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }

  database('jobs')
    .select()
    .then(jobs => {
      if(jobs.length) {
        return response.status(200).json(jobs);
      }
      return response.status(404).json({ message: 'could not find all the jobs'});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/job-types', (request, response) => {
  database('job_types')
    .select()
    .then(job_types => {
      if(job_types.length) {
        return response.status(200).json(job_types);
      }
      return response.status(404).json({ message: 'could not find all the job types'});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/jobs/:id', (request, response) => {
  const { id } = request.params;

  database('jobs')
    .where('id', id)
    .then(job => {
      if(job.length) {
        return response.status(200).json(job);
      }
      return response.status(404).json({ messgae: 'Could not find that job'});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/job-types/:id', (request, response) => {
  const { id } = request.params;

  database('job_types')
    .where('id', id)
    .then(job_type => {
      if(job_type.length) {
        return response.status(200).json(job_type);
      }
      return response.status(404).json({ message: 'could not find that job type'});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/jobs', (request, response) => {
  const job = request.body;

  for (let requiredParameter of [
    'description',
    'company',
    'location',
    'status'
  ]) {
    if (!job[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: { description: <String>, company: <String>, location: <String>, status: <String>, job_title_id: <Integer> }. You're missing a "${requiredParameter}" 
        property.`
      });
    }
  }

  database('jobs')
    .insert(job, 'id')
    .then(job => {
      response.status(201).json({ id: job[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/job-types', (request, response) => {
  const job_type = request.body;

  for (let requiredParameter of ['job_title', 'average_salary']) {
    if (!job_type[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: { job_title: <String>, average_salary: <Integer> }. You're missing a "${requiredParameter}" 
        property.`
      });
    }
  }

  database('job_types')
    .insert(job_type, 'id')
    .then(job_type => {
      response.status(201).json({ id: job_type[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/jobs/:id', (request, response) => {
  const { id } = request.params;
  const { status } = request.body;

  database('jobs')
    .where('id', id)
    .update('status', status)
    .then(response => {
      response.status(200).json({ id });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/jobs/:id/edit', (request, response) => {
  const { id } = request.params;
  const { description, company, location } = request.body;

  database('jobs')
    .where('id', id)
    .update('description', description)
    .update('company', company)
    .update('location', location)
    .then(response => {
      return response.status(200).json({ id });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.delete('/api/v1/jobs/:id', (request, response) => {
  const { id } = request.params;

  database('jobs')
    .where('id', id)
    .del()
    .then(() => {
      response.status(200).json({ id });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/job-types/:id', (request, response) => {
  const { id } = request.params;

  database('job_types')
    .where('id', id)
    .del()
    .then(() => {
      response.status(200).json({ id });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

module.exports = { app, database };