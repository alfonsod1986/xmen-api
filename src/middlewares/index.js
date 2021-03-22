const express = require('express');
const cors = require('cors');
const handleErrors = require('../middlewares/error');
const routes = require('../routes');

module.exports = async () => {
   const app = express();

   app.use(cors());
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   
   app.use('/', [routes, ...handleErrors]);
   return app;
}