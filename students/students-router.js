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
  Students
    .findById(req.params.id)
    .then(student => {
      if(student) {
        res.status(200).json({student});
      } else {
        res.status(404).json({message: 'Student not found.'});
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  Students
    .add(req.body)
    .then( student => {
      res.status(201).json({student});
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Students
    .update(req.params.id, changes)
    .then( count => {
      if(count > 0) {
        res.status(200).json({message: `${count} records updated.`});
      } else {
        res.status(404).json({message: 'student not found.'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Students
    .remove(req.params.id)
    .then( count => {
      if(count > 0) {
        const unit = count > 1 ? 'records' : 'record';
        res.status(200).json({message: `${count} ${unit} deleted.`})
      } else {
        res.status(404).json({message: 'student not found.'})
      }
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

module.exports = router;