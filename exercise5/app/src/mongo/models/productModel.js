'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  shop_id: String,
  name: String,
  price:Number
})

global.db.Shop = global.db.model('product',productSchema);
module.exports = global.db.Shop;
