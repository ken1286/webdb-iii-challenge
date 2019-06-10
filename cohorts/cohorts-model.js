const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findCohortStudents
};

function find() {
  return db('cohorts');
};

function findById(id) {
  return db('cohorts')
    .where({ id })
    .first();
};

function add(item) {
  return db('cohorts')
    .insert(item)
    .then(ids => {
      return findById(ids[0])
    })
};

function update(id, changes) {
  return db('cohorts')
    .where({ id })
    .update(changes);
};

function remove(id) {
  return db('cohorts')
    .where({ id })
    .del()
};

function findCohortStudents(id) {
  return db('students')
    .join('cohorts', 'cohorts.id', 'cohort_id')
    .select('cohorts.name as cohortName', 'students.*')
    .where('students.cohort_id', id);
};