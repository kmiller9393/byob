const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server.js');
const jobsData = require('../jobsData');
const jobTypesData = require('..jobTypesData');

chai.use(chaiHttp);

describe('API Endpoints', () => {
  beforeEach(() => {
    server.locals.jobsData = jobsData;
    server.locals.jobTypesData = jobTypesData;
  });

  it('/api/v1/jobs should return all jobs', done => {
    chai
      .request(server)
      .get('/api/v1/jobs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(5);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal(
          'We are looking for a talented front end developer to join our growing team...'
        );
        response.body[0].should.have.property('company');
        response.body[0].company.should.equal('HomeAdvisor');
        response.body[0].should.have.property('location');
        response.body[0].location.should.equal('Denver, CO');
        response.body[0].should.have.property('job_title_id');
        response.body[0].job_title_id.should.equal(1);
      })
      .done();
  });

  //   it('/api/v1/students should return all students', done => {
  //     chai
  //       .request(server)
  //       .get('/api/v1/students')
  //       .end((error, response) => {
  //         response.should.have.status(200);
  //         response.should.be.json;
  //         response.body.should.be.a('array');
  //         response.body.length.should.equal(3);
  //         response.body[0].should.have.property('lastname');
  //         response.body[0].lastname.should.equal('Turing');
  //         response.body[0].should.have.property('program');
  //         response.body[0].program.should.equal('FE');
  //         response.body[0].should.have.property('enrolled');
  //         response.body[0].enrolled.should.equal(true);
  //         done();
  //       });
  //   });
});
