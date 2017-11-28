const Sequelize = require('sequelize');

module.exports = global.db.define('project', {
  category: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
