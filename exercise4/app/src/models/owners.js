'use strict'

const pg = require('pg');
const Sequelize = require('sequelize');

module.exports = global.db.define('owners', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true
  },
  name: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});
