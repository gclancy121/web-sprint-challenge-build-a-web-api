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


module.exports = {
  verifyAction,

}