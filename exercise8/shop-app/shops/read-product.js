'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const readProduct = require('./model.js').readProduct;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const product = readProduct(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.readProduct(product, callback);
};
