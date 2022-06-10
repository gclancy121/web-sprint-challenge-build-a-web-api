//imports
const express = require('express');

//server setup
const server = express();
server.use(express.json());

//routers
const projectRouter = require('./projects/projects-router');
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`
  <h1>Action and Project API</h1>
  <p>Go to "/api/projects" or "/api/actions" to get started!"</p>
  `);
});



//error handler
server.use((error, req, res, next) => {
  res.status(error.status || 500).json({message: error.message, stack: error.stack});
});

module.exports = server;
