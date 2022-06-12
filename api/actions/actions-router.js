// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {verifyAction, verifyNewAction} = require('./actions-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get().then(result => {
    res.status(200).json(result);
  }).catch(err => next(err));
})

router.get('/:id', verifyAction, (req, res) => {
  res.status(200).json(req.validActions);
});

router.post('/', verifyNewAction, (req, res) => {
  Actions.insert(req.newAction).then(result => {
    res.status(201).json(result);
  })
});

router.put('/:id', verifyNewAction, (req, res) => {
  const changes = {description: req.newAction.description, notes: req.newAction.notes};
  const id = req.newAction.project_id;
  Actions.update(id, changes).then(result => {
    res.status(200).json(result);
  })
})

router.delete('/:id', verifyAction, (req, res) => {
  Actions.remove(req.validActions.id).then(() => {
    res.status(200).end();
  })
})

module.exports = router;
