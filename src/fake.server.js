import init from './middlewares';
import { dbConnection } from './db/mongo';

export const startServer = async () => {
    const app = await init();

    await dbConnection();

    return app;
}