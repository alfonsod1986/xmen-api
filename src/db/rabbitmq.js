const amqplib = require('amqplib');

module.exports = async({ uri, channelName }) => {
    try {
        const connection = await amqplib.connect(uri);

        const channel = await connection.createChannel();
        await channel.assertQueue(channelName);

        return { connection, channel, channelName };
    } catch (err) {
        console.log(err);
    }
}

