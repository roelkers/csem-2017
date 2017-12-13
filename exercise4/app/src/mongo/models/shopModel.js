'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  owner_id: String,
  name: String
})

global.db.Shop = global.db.model('shop',shopSchema);
module.exports = global.db.Shop
