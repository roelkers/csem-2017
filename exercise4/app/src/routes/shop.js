'use strict'

const express = require('express');
const router = express.Router();
const shops = require('../models/shops')

const createShop = (req,res,next) => {
  console.log(req.body.name);
  shops.findOrCreate({where: {name: req.body.name}}).then((data) => {
    res.status(200).send(data[0]);
  })
  .catch(error => console.log(error));
}

const getShopById = (req,res,next) => {

  shops.findById(req.params.id)
    .then((data) => {    
    res.status(200).send(data)
  })
  .catch(error => console.log(error))   
}
const getAllShops = (req,res,next) => {

  shops.findAll()
    .then((data) => {    
    res.status(200).send({
      "data": data
    })
  })
  .catch(error => console.log(error))   
}

const getAllProductsOfShopById = (req,res,next) => {

  shops.findById(req.params.id)
  .then((shop) => {  
    shop.getProducts()
    .then((data)=>{
      res.status(200).send(data)
    })
  })
  .catch(error => console.log(error))   
}

router.get('/',getAllShops);
router.post('/',createShop);
router.get('/:id',getShopById);
router.get('/:id/products', getAllProductsOfShopById);

module.exports = router;
