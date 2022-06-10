// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {verifyAction} = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get().then(result => {
    res.status(200).json(result);
  }).catch(err => next(err));
})

router.get('/:id', verifyAction, (req, res) => {
  res.status(200).json(req.validActions);
});



module.exports = router;
