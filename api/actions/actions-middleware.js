// add middlewares here related to actions
const Actions = require('./actions-model');

function verifyAction(req, res, next) {
Actions.get(req.params.id).then(result => {
  if (result == null) {
    res.status(404).json({message: 'invalid action ID'});
  }
  req.validActions = result;
  next();
})
}

function verifyNewAction(req, res, next) {
const project_id = (req.params.id == null ? req.body.project_id : req.params.id);
const description = req.body.description;
const notes = req.body.notes;
const completed = req.body.completed;
Actions.get(project_id).then(result => {
  if (result == null || Array.isArray(result) === true) {
    res.status(400).json({message: 'invalid id'});
    return;
  }
})
if (typeof description !== 'string' || description == null || description.length > 128) {
  res.status(400).json({message: 'invalid description'});
}
if (typeof notes !== 'string' || notes == null) {
  res.status(400).json({message: "invalid notes"});
}
if (completed === 'true') {
  req.newAction = {description: description, notes: notes, completed: completed};
  req.validId = project_id;
} else {
  req.newAction = {description: description, notes: notes};
  req.validId = project_id;
}

next();
}
 

module.exports = {
  verifyAction,
  verifyNewAction,

}