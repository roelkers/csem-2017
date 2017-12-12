'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const shopSchema = require('../models/shopSchema');
const productSchema = require('../models/productSchema');

const Shop = mongoose.model('shop',shopSchema)
const Product = mongoose.model('shop',productSchema)

const createShop = (req,res,next) => {
  
  const newShop = new Shop({name : req.body.name})
  newShop.save((err,data)=>{
    if(err) throw err;
    res.status(200).send(data);
  });
}

const getShopById = (req,res,next) => {

  Shop.findById(req.params.id,(err,data)=>{
    if(err) throw err;
    res.status(200).send(data)
  });   
}

const getAllOwners = (req,res,next) => {

  Shop.find({},(err,data)=>{
    if(err) throw err;
    res.status(200).send(data)
  });    
}

const getAllProductsOfShopById = (req,res,next) => {

  Shop.findById(req.params.id,(err,data)=>{
    if(err) throw err;
  })
}

router.get('/',getAllShops);
router.post('/',createShop);
router.get('/:id',getShopById);
//router.get('/:id/products', getAllProductsOfShopById);

module.exports = router;
