const statsRepository = require('../repositories/stats.repository');

module.exports = {
    getStats: async(req, res, next) => {
        const stats = await statsRepository.getStats();
    
        return res.send({
            ...stats
        });
    }
}