'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const deleteProduct = require('./model.js').deleteProduct;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const product = deleteProduct(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.deleteProduct(product, callback);
};
