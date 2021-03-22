const mutantRepository = require('../repositories/mutant.repository');
const CustomError = require('../helpers/error');
const {  isMutant } = require('../helpers');

module.exports ={
    post: async(req, res, next) => {
        let { dna } = req.body;
        dna = dna.map(sequence => sequence.toUpperCase());

        const isValid = isMutant(dna);

        mutantRepository.create(dna, isValid);

        if(!isValid) {
            return next(new CustomError({ name: 'fordibben', message: 'Not mutant' }, 403 ))
        }
        return res.send({
            success: true,
            message: 'Mutant',
            statusCode: 200,
        });
    }
}