'use strict'
const express = require('express');
const router = express.Router();
const owners = require('../models/owners');

const createOwner = (req,res,next) => {

  owners.findOrCreate({where: {name: req.body.name}}).then((data) => {
    res.status(200).send(data[0]);
  })
  .catch(error => console.log(error));
}

const getOwnerById = (req,res,next) => {

  owners.findById(req.params.id)
    .then((data) => {    
    res.status(200).send(data)
  })
  .catch(error => console.log(error))   
}

const getAllOwners = (req,res,next) => {

  owners.findAll()
    .then((data) => {    
    res.status(200).send({
      "data": data
    })
  })
  .catch(error => console.log(error))   
}

router.get('/',getAllOwners)
router.post('/',createOwner)
router.get('/:id',getOwnerById);

module.exports = router;
