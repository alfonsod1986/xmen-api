const { isString, isValidSequence, hasTheSameSize, isNxNTable, MIN_SEQUENCE_SIZE } = require('../helpers');
const CustomError = require('../helpers/error');

module.exports = (req, res, next) => {
    const { dna } = req.body;

    if(dna === undefined) {
        return next(new CustomError({ name: 'bad_request', message: 'dna is required' }, 400));
    }

    if (!Array.isArray(dna)) {
        return next(new CustomError({ name: 'bad_request', message: 'dna must be an array' }, 400));
    }

    if (!dna.length != 0) {
        return next(new CustomError({ name: 'bad_request', message: 'dna must not be empty' }, 400));
    }

    if(!dna.every(isString)) {
        return next(new CustomError({ name: 'bad_request', message: 'All dna sequences must be strings' }, 400));
    }

    if (!dna.every(isValidSequence)) {
        return next(new CustomError({ 
            name: 'bad_request',
            message: 'All dna sequences must be valid and only contains A,T,G,C' 
        }, 400));
    }

    if (!hasTheSameSize(dna)) {
        return next(new CustomError({ name: 'bad_request', message: 'All dna sequences sizes must be equal' }, 400));
    }

    if (!isNxNTable(dna)) {
        return next(new CustomError({ name: 'bad_request', message: `dna must be a ${MIN_SEQUENCE_SIZE} x ${MIN_SEQUENCE_SIZE} table` }, 400));
    }
    
    next();
}