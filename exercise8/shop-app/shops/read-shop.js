'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const readShop = require('./model.js').readShop;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const shop = readShop(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.readShop(shop, callback);
};
