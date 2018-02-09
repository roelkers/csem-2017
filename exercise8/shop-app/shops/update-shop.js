'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const updateShop = require('./model.js').updateShop;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const shop = updateShop(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.updateShop(shop, callback);
};
