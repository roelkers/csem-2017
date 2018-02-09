'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const readAllProducts = require('./model.js').readAllProducts;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const shop = readAllProducts(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.readAllProducts(shop, callback);
};
