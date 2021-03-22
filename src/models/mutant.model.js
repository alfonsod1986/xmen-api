const mongoose = require('mongoose');

const MutantSchema= new mongoose.Schema({
    dna: [String],
    isMutant: { type: Boolean, required: true }
});

module.exports = mongoose.model('Mutant', MutantSchema);