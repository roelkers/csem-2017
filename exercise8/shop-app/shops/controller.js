'use strict';

const Shop = require('./model.js');
const NULL_PRODUCT_ID = '0';

module.exports = class ShopController {

    constructor(docClient, table) {
        this.dynamo = docClient;
        this.table = table;
    }

    createShop(shop, callback) {
        shop.product_id = NULL_PRODUCT_ID; // initialize with an "empty product"
        const params = {
            TableName: this.table,
            Item: shop
        };

        console.log(params);

        this.dynamo.put(params, (error, result) => {
            processDynamoResponse(error, result, callback);
        });
    }

    readShop(shop, callback) {
        const params = {
            TableName: this.table,
            Key: {
                shop_id: shop.shop_id,
                product_id: NULL_PRODUCT_ID
            }
        };

        this.dynamo.get(params, (error, result) => {
            processDynamoResponse(error, result, callback);
        });
    }

    readAllShops(callback) {
        const params = {
            TableName: this.table
        };

        this.dynamo.scan(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('A database error occured.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Items)
            };
            callback(null, response);
        });
    }

    updateShop(shop, callback) {
        const params = {
            TableName: this.table,
            Key: {
                shop_id: shop.shop_id,
                product_id: NULL_PRODUCT_ID
            },
            UpdateExpression: 'set #name = :value',
            ExpressionAttributeNames: {
                '#name': 'shop_name'
            },
            ExpressionAttributeValues: {
                ':value': shop.shop_name
            }
        };

        this.dynamo.update(params, (error, result) => processDynamoResponse(error, result, callback));
    }

    // deleting is expensive because of chosen data model
    // might be slightly improved by batching delete operations
    deleteShop(shop, callback) {
        // need to retrieve all products
        const params = {
            TableName: this.table,
            KeyConditionExpression: "shop_id = :s",
            ExpressionAttributeValues: {
                ":s": shop.shop_id
            }
        };

        this.dynamo.query(params, (error, products) => {
            if (error) {
                console.error(error);
                callback(new Error('A database error occured.'));
                return;
            }

            // batch operation?
            products.Items.forEach(product => {
                const paramsNestedDelete = {
                    TableName: this.table,
                    Key: {
                        shop_id: product.shop_id,
                        product_id: product.product_id
                    }
                };

                this.dynamo.delete(paramsNestedDelete, (error, result) => {
                    if (error) {
                        console.error(error);
                        callback(new Error('A database error occured.'));
                        return;
                    }
                });
            });
            callback(null, { message: "shop deleted" });
        });
    }

    createProduct(product, callback) {
        const params = {
            TableName: this.table,
            Item: product
        };

        this.dynamo.put(params, (error, result) => {
            processDynamoResponse(error, result, callback);
        });
    }

    readProduct(product, callback) {
        const params = {
            TableName: this.table,
            Key: {
                shop_id: product.shop_id,
                product_id: product.product_id
            }
        };

        this.dynamo.get(params, (error, result) => {
            processDynamoResponse(error, result, callback);
        });
    }

    readAllProducts(shop, callback) {
        const params = {
            TableName: this.table,
            KeyConditionExpression: "shop_id = :s",
            ExpressionAttributeValues: {
                ":s": shop.shop_id
            }
        };

        this.dynamo.query(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('A database error occured.'));
                return;
            }

            // filter out the empty dummy item
            let items = result.Items.filter(item => item.product_id != '0');

            const response = {
                statusCode: 200,
                body: JSON.stringify(items)
            };
            callback(null, response);
        });
    }

    updateProduct(product, callback) {
        const params = {
            TableName: this.table,
            Key: {
                shop_id: product.shop_id,
                product_id: product.product_id
            },
            UpdateExpression: 'set #name = :value',
            ExpressionAttributeNames: {
                '#name': 'product_name'
            },
            ExpressionAttributeValues: {
                ':value': product.product_name
            }
        };

        this.dynamo.update(params, (error, result) => processDynamoResponse(error, result, callback));
    }

    deleteProduct(product, callback) {
        const params = {
            TableName: this.table,
            Key: {
                shop_id: product.shop_id,
                product_id: product.product_id
            }
        };

        this.dynamo.delete(params, (error, result) => processDynamoResponse(error, result, callback));
    }
}

function processDynamoResponse(error, result, callback) {
    if (error) {
        console.error(error);
        callback(new Error('A database error occured.'));
        return;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
    callback(null, response);

}