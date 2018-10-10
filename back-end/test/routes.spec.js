const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server.js');
const jobsData = require('../utils/jobsData');
const jobTypesData = require('../utils/jobTypesData');

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
});
