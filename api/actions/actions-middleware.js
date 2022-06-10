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
 const id = req.body.project_id;
 const description = req.body.description;
 const notes = req.body.notes;
 if (typeof id !== "number" || id == null) {
  res.status(400).json({message: 'invalid id'});
 } else {
    Actions.get(id).then(result => {
      if (Array.isArray(result) || result == null) {
        res.status(400).json({message: "invalid id"});
      } else {
        if (typeof description !== 'string' || description == null || description.trim() === '') {
          res.status(400).json({message: "invalid action description"});
         } else {
          if (description.length > 128) {
            res.status(400).json({message: "description is too long"});
           } else {
            if (typeof notes !== 'string' || notes == null || notes.trim() === '') {
              res.status(400).json({message: "invalid action notes"});
            }
           }
         }
      }
    })
 }

 req.newAction = {project_id: req.body.project_id, description: description.trim(), notes: notes.trim()};
 next();
}

module.exports = {
  verifyAction,
  verifyNewAction,

}