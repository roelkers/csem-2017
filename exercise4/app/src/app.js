'use strict';

// 3rd-party dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbSetup = require('./db-setup');

// Application config
const LOCAL_APP_PORT = 8080;

const PUBLIC_APP_PORT = process.env.PUBLIC_APP_PORT || LOCAL_APP_PORT;
global.dbType = process.env.DB_TYPE;

// Sanity check for debugging
console.log("local app port:", LOCAL_APP_PORT);
console.log("public app port:", PUBLIC_APP_PORT);
console.log("db type:", global.dbType);

// Database setup for either MongoDB or Postgres
dbSetup(global.dbType);

// Express middleware
app.use(bodyParser.json()); // for parsing application/json

if(global.dbType=='postgres'){
  // Import routes
  const owner = require('./postgres/routes/owner');
  const shop = require('./postgres/routes/shop');
  const product = require('./postgres/routes/product');

  // Set up express routes
  app.use('/owner', owner);
  app.use('/shop', shop);
  app.use('/product', product);
}
else if(global.dbType=='mongodb'){
  const owner = require('./mongo/routes/owner');
  const shop = require('./mongo/routes/shop');
  const product = require('./mongo/routes/product');

  // Set up express routes
  app.use('/owner', owner);
  app.use('/shop', shop);
  app.use('/product', product);
}
else
{
  console.error(`Database ${dbType} is unknown. Please select either postgres or mongodb.`);
  process.exit(1);
}

app.listen(LOCAL_APP_PORT, () => {
  console.log('App started ...');
});
