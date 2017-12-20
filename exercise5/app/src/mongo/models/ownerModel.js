'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: String,
})

global.db.Owner = global.db.model('owner',ownerSchema);
module.exports = global.db.Owner;
