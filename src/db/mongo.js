const mongoose = require('mongoose')

module.exports = async({ uri, options }) => {
    await mongoose.connect(uri, options)
            .then(() => console.log('\nConnected to MongoDB...'))
            .catch(err => {
                console.error('\nCould not connect to MongoDB...' + err)
                process.exit(1)
            });
}