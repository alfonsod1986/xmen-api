module.exports = {
    port: process.env.APP_PORT || 3000,
    databases: {
        mongo: {
            uri: process.env.MONGO_URI || 'mongodb://localhost:27017/xmen',
            options: {
                useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
            }
        },
        rabbitmq: {
            uri: process.env.CLOUDAMQP_URL || 'amqp://localhost:5672',
            channelName: process.env.CLOUDAMQP_CHANNEL || 'xmen_queue'
        }
    } 
}