'use strict'

const express = require('express');
const router = express.Router();
const dynamoDb = require('../db');
const uuid = require('uuid');

const SHOPS_TABLE = process.env.SHOPS_TABLE;

const createShop = (req,res,next) => {

  if (typeof req.body.owner_id !== 'string') {
    res.status(400).json({ error: '"owner_id" must be a string' });
  } else if (typeof req.body.name !== 'string') {
    res.status(400).json({ error: '"name"" must be a string' });
  }
  const genId = uuid.v1();
  const params = {
    TableName: SHOPS_TABLE,
    Item: {
      id: genId,
      owner_id: req.body.owner_id,
      name: req.body.name
    },
  };
  console.log(genId);
  dynamoDb.put(params, (error,result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create shop' });
      }
      res.json({
        id : genId,
        owner_id: req.body.owner_id,
        name : req.body.name })
    });
  }

const getShopById = (req,res,next) => {

  const params = {
    TableName: SHOPS_TABLE,
    Key: {
      id: req.params.id
    }
  }

  dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get shop' });
      }
      if (result.Item) {
        const {id, name, owner_id} = result.Item;
        console.log(result.Item);
        res.json({ id, name, owner_id });
      } else {
        res.status(404).json({ error: "shop not found" });
      }
  });
}

const deleteShopById = (req,res,next) => {

  const params = {
    TableName: SHOPS_TABLE,
    Key: {
      id: req.params.id
    }
  }

  dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not delete shop' });
      }
      if(result){
        res.json(result);
      } else {
        res.status(404).json({ error: "shop not found" });
      }
  });
}


const updateShopById = (req,res,next) => {

  if (typeof req.params.id !== 'string') {
    res.status(400).json({ error: '"id" must be a string' });
  } else if (typeof req.body.name !== 'string') {
    res.status(400).json({ error: '"name"" must be a string' });
  } else if (typeof req.body.owner_id !== 'number') {
    res.status(400).json({ error: '"price"" must be a string' });
  }

  const params = {
    TableName: SHOPS_TABLE,
    UpdateExpression: "set owner_id=:o, #name=:n",
    ExpressionAttributeValues:{
        ":n":req.body.name,
        ":o":req.body.owner_id,
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
        res.status(400).json({ error: 'Could not update shop' });
      }
      console.log(result)
      if (result) {
        const {name, owner_id} = result.Attributes;
        res.json({id:req.params.id, name:name, owner_id:owner_id });
      } else {
        res.status(404).json({ error: "shop not found" });
      }
  });
}

router.post('/',createShop);
router.get('/:id',getShopById);
router.put('/:id',updateShopById);
router.delete('/:id',deleteShopById);

module.exports = router;
