const MutantModel = require('../models/mutant.model');
const createChannel = require('../db/rabbitmq');
const Conf = require('../conf');

const { databases: { rabbitmq}} = Conf;

module.exports = {
    create: async (dna, isMutant) => {
        const { connection, channel, channelName } = await createChannel(rabbitmq);
        await channel.sendToQueue(channelName, Buffer.from(JSON.stringify({ dna, isMutant })));
        await channel.close();
        await connection.close();
    }
}