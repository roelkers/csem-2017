'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const createProduct = require('./model.js').createProduct;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const product = createProduct(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.createProduct(product, callback);
};
