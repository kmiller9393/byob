const jobTypesData = require('../../../utils/jobTypesData.json');

exports.seed = knex => {
  return knex('job_types')
    .del()
    .then(() => {
      return knex('job_types').insert(jobTypesData);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
