'use strict'

const pg = require('pg');
const Sequelize = require('sequelize');

module.exports = global.db.define('shops', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});
