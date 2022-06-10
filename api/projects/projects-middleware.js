// add middlewares here related to projects
const Projects = require('./projects-model');

function verifyProject(req, res, next) {
  Projects.get(req.params.id).then(result => {
    if (result == null) {
      res.status(404).json({message: "invalid project ID"});
    }
    req.validProject = result;
    next();
  })
}
function verifyNewProject(req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  if (typeof name !== 'string' || name == null || name.trim() === '') {
    res.status(400).json({message: "project name required"});
  } else {
    if (typeof description !== 'string' || description == null || description.trim() === '') {
      res.status(400).json({message: "project description required"});
    }
  }
  req.newProject = {name: name.trim(), description: description.trim()};
  next();
}

module.exports = {
  verifyProject,
  verifyNewProject,

}