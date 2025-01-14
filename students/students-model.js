const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('students')
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select('students.id', 'students.name', 'cohorts.name as cohort' );
};

function findById(id) {
  return db('students')
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select('students.id', 'students.name', 'cohorts.name as cohort' )
    .where({ 'students.id': id })
    .first();
};

function add(item) {
  return db('students')
    .insert(item)
    .then(ids => {
      return findById(ids[0])
    })
};

function update(id, changes) {
  return db('students')
    .where({ id })
    .update(changes);
};

function remove(id) {
  return db('students')
    .where({ id })
    .del()
};