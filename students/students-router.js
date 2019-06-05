const router = require('express').Router();
const Students = require('./students-model.js');

router.get('/', (req, res) => {
  Students
    .find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Cohorts
    .findById(req.params.id)
    .then(cohort => {
      if(cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({message: 'Cohort not found.'});
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

module.exports = router;