const Config = require('./conf');
const init = require('./middlewares');
const dbConnection = require('./db/mongo');

const startServer = async ({ port, databases }) => {
    const { mongo } = databases;
    const app = await init();

    await dbConnection(mongo);
    
    app.listen(port, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running on port ${port}`);
    });
}

startServer(Config);