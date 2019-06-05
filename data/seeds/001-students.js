
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'bob', cohort_id: 1},
        {id: 2, name: 'steve', cohort_id: 2},
        {id: 3, name: 'jenny', cohort_id: 3}
      ]);
    });
};
