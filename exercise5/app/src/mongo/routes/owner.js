'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Owner = require('../models/ownerModel');

mongoose.Promise = global.Promise;

const createOwner = (req,res,next) => {

  Owner.create({name : req.body.name})
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));  
}

const getOwnerById = (req,res,next) => {

  Owner.findById(req.params.id)
  .then((data)=>{
    res.status(200).send(data)
  })
  .catch(error => console.log(error));  
}

const getAllOwners = (req,res,next) => {

  Owner.find({})
  .then((data)=>{
    res.status(200).send(data)
  })
  .catch(error => console.log(error));  
}

const updateOwner = (req,res,next) => {

  Owner.findOneAndUpdate({
    _id: req.body._id
  },
  {
    name: req.body.name
  },
  {new: true})
  .then(data => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));
}

router.get('/',getAllOwners);
router.post('/',createOwner);
router.get('/:id',getOwnerById);
router.put('/',updateOwner);

module.exports = router;
