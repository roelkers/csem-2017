'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const deleteShop = require('./model.js').deleteShop;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const shop = deleteShop(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.deleteShop(shop, callback);
};
