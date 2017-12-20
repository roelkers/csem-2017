'use strict'
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

const createProduct = (req,res,next) => {

  Product.create({name: req.body.name, shop_id: req.body.shop_id, price: req.body.price})
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));   
}

const getProductById = (req,res,next) => {

Product.findById(req.params.id)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));    
}

const getAllProducts = (req,res,next) => {

  Product.find({})
  .then((data) => {
      res.status(200).send({"data" : data})
  })
  .catch(error => console.log(error));    
}


router.get('/',getAllProducts)
router.post('/',createProduct)
router.get('/:id',getProductById);

module.exports = router;
