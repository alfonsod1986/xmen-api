const router = require('express').Router();
const statsController = require('../controllers/stats.controller');

router
    .route('/')
    .get(statsController.getStats);

module.exports = router;