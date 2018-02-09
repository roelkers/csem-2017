'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const ShopController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const controller = new ShopController(dynamo, 'ShopTable');
    controller.readAllShops(callback);
};
