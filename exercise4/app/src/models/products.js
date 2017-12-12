'use strict'

const pg = require('pg');
const Sequelize = require('sequelize');

module.exports = global.db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: false
});
