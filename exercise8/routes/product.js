'use strict'
const express = require('express');
const router = express.Router();
const dynamoDb = require('../db');
const uuid = require('uuid');

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const createProduct = (req,res,next) => {

  if (typeof req.body.shop_id !== 'string') {
    res.status(400).json({ error: '"Id" must be a string' });
  } else if (typeof req.body.name !== 'string') {
    res.status(400).json({ error: '"name"" must be a string' });
  } else if (typeof req.body.price !== 'number') {
    res.status(400).json({ error: '"price"" must be a number' });
  }

  const genId = uuid.v1();
  console.log("generated Id:\n"+genId+"\n");
  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      id: genId,
      shop_id: req.body.shop_id,
      price: req.body.price,
      name: req.body.name
    },
  };

  dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create product' });
      }

      res.json({
        id: genId,
        shop_id: req.body.shop_id,
        price:req.body.price,
        name : req.body.name });
    });
  }

const getProductById = (req,res,next) => {

  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      id: req.params.id
    }
  }

  dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get product' });
      }
      if (result.Item) {
        const {id, name, price, shop_id} = result.Item;
        res.json({ id, name, price, shop_id });
      } else {
        res.status(404).json({ error: "product not found" });
      }
  });
}

const deleteProductById = (req,res,next) => {

  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      id: req.params.id
    }
  }

  dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not delete product' });
      }
      if(result){
        res.json(result);
      } else {
        res.status(404).json({ error: "product not found" });
      }
  });
}


const updateProductById = (req,res,next) => {

  if (typeof req.params.id !== 'string') {
    res.status(400).json({ error: '"Id" must be a string' });
  } else if (typeof req.body.name !== 'string') {
    res.status(400).json({ error: '"name"" must be a string' });
  } else if (typeof req.body.price !== 'number') {
    res.status(400).json({ error: '"price"" must be a number' });
  }

  const params = {
    TableName: PRODUCTS_TABLE,
    UpdateExpression: "set price=:p, #name=:n, shop=:o",
    ExpressionAttributeValues:{
        ":n":req.body.name,
        ":p":req.body.price,
        ":o":req.body.shop_id
    },
    ExpressionAttributeNames: {
    "#name": "name"
    },
    ReturnValues:"UPDATED_NEW",
    Key:{
      id: req.params.id
    }
  };

  console.log(params)
  dynamoDb.update(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not update product' });
      }
      console.log(result)
      if (result) {
        const {name, price, shop_id} = result.Attributes;
        res.json({id:req.params.id, name:name, price:price, shop_id:shop_id });
      } else {
        res.status(404).json({ error: "product not found" });
      }
  });
}

router.post('/',createProduct)
router.get('/:id',getProductById);
router.delete('/:id',deleteProductById);
router.put('/:id',updateProductById)
module.exports = router;
