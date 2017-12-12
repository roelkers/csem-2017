'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: String
})

module.exports = global.db.model('owner',ownerSchema);
