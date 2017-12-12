'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

global.db.shopSchema = new Schema({
  name: String
})

module.exports = global.db.model('shop',shopSchema);
