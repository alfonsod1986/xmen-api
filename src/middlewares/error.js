const CustomError = require('../helpers/error');

const notFound = (req, res, next) => {
    next(new CustomError({name:'not_found', message: 'Route not found'}, 404));
}

const showError = (err, req, res, next) => 
    res.status(err.status || 500).send({
      success: false,
      name: err.name,
      message: err.message,
      statusCode: err.status || 500
    });

module.exports = [
  notFound, showError
];