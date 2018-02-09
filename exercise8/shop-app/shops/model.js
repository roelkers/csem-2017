'use strict';

const uuid = require('uuid');

class Shop {
    constructor(id, shop_name) {
        this.shop_id = id;
        this.shop_name = shop_name;
    }
}

class Product {
    constructor(shop_id, product_id, product_name) {
        this.shop_id = shop_id;
        this.product_id = product_id;
        this.product_name = product_name;
    }
}

const createShop = (event, callback) => {
    const body = JSON.parse(event.body);
    const id = uuid.v1();
    const shop_name = body.shop_name;
    return new Shop(id, shop_name);
}

const readShop = (event, callback) => {
    const params = event.pathParameters;
    const id = params.id;
    return new Shop(id);
}

const updateShop = (event, callback) => {
    const body = JSON.parse(event.body);
    const id = body.shop_id;
    const shop_name = body.shop_name;
    return new Shop(id, shop_name);
}

const deleteShop = (event, callback) => {
    const body = JSON.parse(event.body);
    const id = body.shop_id;
    return new Shop(id);
}

const createProduct = (event, callback) => {
    const body = JSON.parse(event.body);
    const shop_id = body.shop_id;
    const product_id = uuid.v1();
    const product_name = body.product_name;
    return new Product(shop_id, product_id, product_name);
}

const readProduct = (event, callback) => {
    const params = event.pathParameters;
    const shop_id = params.shop_id;
    const product_id = params.product_id;
    return new Product(shop_id, product_id);
}

const readAllProducts = (event, callback) => {
    const params = event.pathParameters;
    const shop_id = params.shop_id;
    return new Shop(shop_id);
}

const updateProduct = (event, callback) => {
    const params = event.pathParameters;
    const body = JSON.parse(event.body);
    const shop_id = params.shop_id;
    const product_id = body.product_id;
    const product_name = body.product_name;
    return new Product(shop_id, product_id, product_name);
}

const deleteProduct = (event, callback) => {
    const params = event.pathParameters;
    const body = JSON.parse(event.body);
    const shop_id = params.shop_id;
    const product_id = body.product_id;
    return new Product(shop_id, product_id);
}

module.exports = {
    Shop,
    createShop,
    readShop,
    updateShop,
    deleteShop,
    Product,
    createProduct,
    readProduct,
    readAllProducts,
    updateProduct,
    deleteProduct
}
