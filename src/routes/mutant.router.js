const router = require('express').Router();
const DNAValidator = require('../middlewares/validators');
const mutantController = require('../controllers/mutant.controller');

router
    .route('/')
    .post(DNAValidator, mutantController.post);

module.exports =router;