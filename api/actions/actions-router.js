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

router.post('/', verifyNewAction, (req, res, next) => {
 console.log(req.newAction, req.validId);
 const usad = {
  project_id: req.validId,
  description: req.newAction.description,
  notes: req.newAction.notes,
 }
 if (req.newAction.completed !== null) {
  usad.completed = req.newAction.completed;
 }
 Actions.insert(usad).then(result => {
  res.status(201).json(result);
 }).catch(err => next(err));
});
 
router.put('/:id', verifyNewAction, (req, res, next) => {
 Actions.update(req.validId, req.newAction).then(result =>  {
  res.status(200).json(result);
 }).catch(err => next(err));
})

router.delete('/:id', verifyAction, (req, res) => {
  Actions.remove(req.validActions.id).then(() => {
    res.status(200).end();
  })
})

module.exports = router;
