'use strict';

// 3rd-party dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const Sequelize = require('sequelize');

// Application config
const LOCAL_APP_PORT = 8080;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE || "";

// Sanity check for debugging
console.log("local app port:", LOCAL_APP_PORT);
console.log("db host:", PG_HOST);
console.log("db port:", PG_PORT);

// Set up a global Postgresql DB connection pool
global.db = new Sequelize(PG_DATABASE, PG_USER, "", {
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

// Express middleware
app.use(bodyParser.json()); // for parsing application/json

// Import express routes
const index = require('./routes/index');

// Set up express routes
app.use('/', index);

app.listen(LOCAL_APP_PORT, function() {
  console.log('App started ...');
});
