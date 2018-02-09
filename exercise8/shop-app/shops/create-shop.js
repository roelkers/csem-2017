'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const createShop = require('./model.js').createShop;
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const shop = createShop(event, callback);
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.createShop(shop, callback);
};
