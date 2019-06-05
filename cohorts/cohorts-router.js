const router = require('express').Router();
const Cohorts = require('./cohorts-model.js');

router.get('/', (req, res) => {
  Cohorts
    .find()
    .then(cohorts => {
      res.status(200).json(cohorts);
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

router.post('/', (req, res) => {
  Cohorts
    .add(req.body)
    .then( cohort => {
      res.status(201).json({cohort});
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Cohorts
    .update(req.params.id, changes)
    .then( count => {
      if(count > 0) {
        res.status(200).json({message: `${count} records updated.`});
      } else {
        res.status(404).json({message: 'cohort not found.'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Cohorts
    .remove(req.params.id)
    .then( count => {
      if(count > 0) {
        const unit = count > 1 ? 'records' : 'record';
        res.status(200).json({message: `${count} ${unit} deleted.`})
      } else {
        res.status(404).json({message: 'cohort not found.'})
      }
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

router.get('/:id/students', (req, res) => {
  Cohorts
    .findCohortStudents(req.params.id)
    .then(students => {
      res.status(200).json({ students });
    })
    .catch(err => {
      res.status(500).json({ err })
    })
});

module.exports = router;