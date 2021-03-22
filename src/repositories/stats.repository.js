const MutantModel = require('../models/mutant.model');

module.exports = {
    getStats: async () => {
        const result=  await MutantModel.aggregate([
            {
                $project: { isMutant: 1 }
            },
            {
                $group: {
                    _id: "$dna",
                    count_mutant_dna: {
                        $sum: { $cond: ["$isMutant", 1, 0] }
                    },
                    count_human_dna: {
                        $sum: { $cond: ["$isMutant", 0, 1] }
                    }
                }
            },
            {
                $addFields: {
                    ratio: {
                        $cond: [
                            { $eq: ["$count_human_dna", 0]},
                            0,
                            { $divide: ["$count_mutant_dna", "$count_human_dna"] }
                        ]
                    }
                }
            },
            { 
                $project: { 
                    _id: 0 ,
                    ratio: { $trunc: [ "$ratio", 1 ] },
                    count_mutant_dna: 1,
                    count_human_dna: 1
               }
            }
        ]);
        return result[0] ? result[0] : { count_mutant_dna: 0, count_human_dna: 0, ratio: 0.0 };
    }
}