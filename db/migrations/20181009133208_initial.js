exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('job_types', table => {
      table.increments('id').primary();
      table.string('job_title');
      table.integer('average_salary');
    }),

    knex.schema.createTable('jobs', table => {
      table.increments('id').primary();
      table.string('description');
      table.string('company');
      table.string('location');
      table.string('status');
      table.integer('job_title_id').unsigned();
      table.foreign('job_title_id').references('job_types.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('jobs'),
    knex.schema.dropTable('job_types')
  ]);
};
