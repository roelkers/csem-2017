'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

global.db.priceSchema = new Schema({
  name: String,
  price:Number
})

module.exports = global.db.model('product',productSchema);
