const express = require('express');
const router = express.Router();
const Project = require('../models/project');

const index = (req, res, next) => {
  // show all projects
  Project.findAll().then((data) => {    
    res.status(200).send({
      "data": data
    });      
  });
};

const createProject = (req, res, next) => {
  // show all projects
  Project.create(req.body).then((data) => {
    res.status(200).send(data);
  });
};

// Routes
router.get('/', index);
router.post('/create', createProject);

module.exports = router;
