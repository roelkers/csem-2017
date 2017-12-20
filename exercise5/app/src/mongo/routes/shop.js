'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')

const createShop = (req,res,next) => {

  Shop.create({name: req.body.name, owner_id: req.body.owner_id})
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));   
}

const getShopById = (req,res,next) => {

  Shop.findById(req.params.id)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(error => console.log(error));    
}

const getAllShops = (req,res,next) => {

  Shop.find({})
  .then((data) => {
      res.status(200).send(data);
  })
  .catch(error => console.log(error));    
}

const getAllProductsOfShopById = (req,res,next) => {

  Product.find({shop_id: req.params.id})
  .then((data) => {
      res.status(200).send(data);
  })
  .catch(error => console.log(error));   

}

router.get('/',getAllShops);
router.post('/',createShop);
router.get('/:id',getShopById);
router.get('/:id/products', getAllProductsOfShopById);

module.exports = router;
