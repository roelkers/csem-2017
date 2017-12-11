'use strict'
const express = require('express');
const router = express.Router();
const products = require('../models/products');


const createProduct = (req,res,next) => {
  console.log(`${req.body.name},${req.body.price},${req.body.shop_id}`);
  products.findOrCreate({where:
    {name: req.body.name,
     price:req.body.price,
     shop_id: req.body.shop_id
    }})
    .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));
}

const getProductById = (req,res,next) => {

  products.findById(req.params.id)
    .then((data) => {    
    res.status(200).send(data);
  })
  .catch(error => console.log(error))   
}


const getAllProducts = (req,res,next) => {

  products.findAll()
    .then((data) => {    
    res.status(200).send(data)
  })
  .catch(error => console.log(error))   
}

router.get('/',getAllProducts)
router.post('/',createProduct)
router.get('/:id',getProductById);

module.exports = router;
