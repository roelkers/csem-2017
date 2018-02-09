'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const updateProduct = require('./model.js').updateProduct;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const product = updateProduct(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.updateProduct(product, callback);
};
