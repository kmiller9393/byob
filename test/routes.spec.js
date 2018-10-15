const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { app, database } = require('../server.js');

chai.use(chaiHttp);

describe('API Endpoints', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  it(' GET /api/v1/jobs should return all jobs', done => {
    chai
      .request(app)
      .get('/api/v1/jobs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(23);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal('A good job');
        response.body[0].should.have.property('company');
        response.body[0].company.should.equal('DHI GROUP, INC.');
        response.body[0].should.have.property('location');
        response.body[0].location.should.equal('GREATER DENVER AREA');
        response.body[0].should.have.property('job_title_id');
        response.body[0].job_title_id.should.equal(1);
        done();
      });
  });

  it('GET /api/v1/job-types should return all job types', done => {
    chai
      .request(app)
      .get('/api/v1/job-types')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(18);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('job_title');
        response.body[0].job_title.should.equal('Application Architect');
        response.body[0].should.have.property('average_salary');
        response.body[0].average_salary.should.equal(85000);
        done();
      });
  });

  it('GET /api/v1/jobs/:id should return a job', done => {
    chai
      .request(app)
      .get('/api/v1/jobs/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
        response.body[0].should.have.property('company');
        response.body[0].company.should.equal('TRAVELERS HAVEN');
        response.body[0].should.have.property('location');
        response.body[0].location.should.equal('GREATER DENVER AREA');
        response.body[0].should.have.property('job_title_id');
        response.body[0].job_title_id.should.equal(2);
        done();
      });
  });

  it('GET /api/v1/job-types/:id should return all job types', done => {
    chai
      .request(app)
      .get('/api/v1/job-types/3')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(3);
        response.body[0].should.have.property('job_title');
        response.body[0].job_title.should.equal('Full Stack Developer');
        response.body[0].should.have.property('average_salary');
        response.body[0].average_salary.should.equal(85000);
        done();
      });
  });

  it('POST /api/v1/jobs should add a job', done => {
    chai
      .request(app)
      .post('/api/v1/jobs')
      .send({
        description: 'We are looking for someone to test.',
        company: 'SpotX',
        location: 'Denver, CO',
        status: 'none'
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        response.body.id.should.equal(24);
        done();
      });
  });

  it('POST /api/v1/job-types should add a job type', done => {
    chai
      .request(app)
      .post('/api/v1/job-types')
      .send({
        job_title: 'Junior Developer',
        average_salary: 73500
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        response.body.id.should.equal(24);
        done();
      });
  });

  it('DELETE /api/v1/jobs/:id should delete a job with a specific id', done => {
    chai
      .request(app)
      .delete('/api/v1/jobs/3')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.id.should.equal('3');
        done();
      });
  });

  it('DELETE /api/v1/jobs/:id should return a 500 status code if invalid id is requested', done => {
    chai  
      .request(app)
      .delete('/api/v1/jobs/')
      .end((error, response) => {
        response.should.have.status(404)

      })
      done();
  })

  it('DELETE /api/v1/job-types/:id', done => {
    chai
      .request(app)
      .delete('/api/v1/job-types/4')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.id.should.equal('4');
        done();
      });
  });

  it('PATCH /api/v1/jobs/:id should change the status of a job based on id requested', done => {
    chai
      .request(app)
      .patch('/api/v1/jobs/3')
      .send({
        status: 'saved'
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.equal('saved');
        done();
      });
  });
});
