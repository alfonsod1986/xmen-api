const router = require('express').Router();
const mutant = require('./mutant.router');
const stats = require('./stats.router');

router.use('/mutant', mutant);
router.use('/stats', stats);

module.exports =router;