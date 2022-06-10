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
  Projects.update(req.validProject.id, req.newProject).then(result => {
    res.status(200).json(result);
  })
})

module.exports = router;
