'use strict';

module.exports = (dbType) => {
    if (dbType && dbType.toLowerCase() == 'postgres') {
        const pg = require('pg');
        const Sequelize = require('sequelize');

        // DB config
        const PG_HOST = process.env.PG_HOST;
        const PG_PORT = process.env.PG_PORT;
        const PG_USER = process.env.PG_USER;
        const PG_DATABASE = process.env.PG_DATABASE || "";

        // Sanity check for debugging
        console.log("db host:", PG_HOST);
        console.log("db port:", PG_PORT);

        // Set up a global Postgresql DB connection pool
        global.db = new Sequelize(PG_DATABASE, PG_USER, "", {
            host: PG_HOST,
            port: PG_PORT,
            dialect: 'postgres',
            define: {
                underscored: true
            },
            logging: false
        })

        global.db
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
          // Set up associations
          const owners = require('./models/owners');
          const products = require('./models/products');
          const shops = require('./models/shops');

          //One to One relation between owner and shop
          owners.hasOne(shops);
          //One to many relation between shop and products
          shops.hasMany(products);
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
    } else if (dbType && dbType.toLowerCase() == 'mongodb') {
        const mongoose = require('mongoose');

        // Application config
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_PORT = process.env.MONGO_PORT;

        // Sanity check for debugging
        console.log("mongo host:", MONGO_HOST);
        console.log("mongo port:", MONGO_PORT);

        // MongoDB connection
        const MONGO_URL = 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT + '/dev';
        global.db = mongoose.createConnection(MONGO_URL);
    } else {
        console.error(`Database ${dbType} is unknown. Please select either postgres or mongodb.`);
        process.exit(1);
    }
};
