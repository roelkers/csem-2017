'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Owner = require('../models/ownerModel');

mongoose.Promise = global.Promise;

const createOwner = (req,res,next) => {

  Owner.create({name : req.body.name},function(err,data){
    if (err) return console.error(err);
    console.log(data)
    res.status(200).send(data);
  });
}

const getOwnerById = (req,res,next) => {

  Owner.findById(req.params.id,(err,data)=>{
    if(err) throw err;
    res.status(200).send(data)
  });   
}

const getAllOwners = (req,res,next) => {

  Owner.find({},(err,data)=>{
    if(err) throw err;
    res.status(200).send(data)
  });    
}

router.get('/',getAllOwners)
router.post('/',createOwner)
router.get('/:id',getOwnerById);

module.exports = router;
