const jobsData = require('../../../utils/jobsData.json');

exports.seed = knex => {
  return knex('jobs')
    .del()
    .then(() => {
      return knex('jobs').insert(jobsData);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
