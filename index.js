const Config = require('./src/conf');
const init = require('./src/middlewares');
const dbConnection = require('./src/db/mongo');

const startServer = async ({ port, ip, databases }) => {
    const { mongo } = databases;
    const app = await init();

    await dbConnection(mongo);
    
    app.listen(port, ip, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running on port ${port}`);
    });
}

startServer(Config);