// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {verifyProject, verifyNewProject} = require('./projects-middleware');

const router = express.Router();

router.get('/',(req, res, next) => {
Projects.get().then(result => {
  res.status(200).json(result);
}).catch(error => next(error));
});

router.get('/:id', verifyProject, (req, res) => {
  res.status(200).json(req.validProject);
});

router.post('/', verifyNewProject, (req, res) => {
  Projects.insert(req.newProject).then(result => {
    res.status(201).json(result);
  })
})

router.put('/:id', verifyProject, verifyNewProject, (req, res) => {
  if (req.body.completed == null) {
    res.status(400).json({message: 'completion update required'});
  } else {
    req.newProject = {...req.newProject, completed: req.body.completed};
    Projects.update(req.validProject.id, req.newProject).then(result => {
      res.status(200).json(result);
    })
  }
})

router.delete("/:id", verifyProject, (req, res) => {
  Projects.remove(req.validProject.id).then(() => {
    res.status(200).end();
  })
})
router.get('/:id/actions', verifyProject, (req, res) => {
  console.log(req.validProject.actions)
  res.status(200).json(req.validProject.actions);
})

module.exports = router;
