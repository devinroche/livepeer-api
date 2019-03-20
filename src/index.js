import cluster from 'cluster';
import express from 'express';
import routes from './routes';
import 'babel-polyfill';
import cors from 'cors';
import morgan from 'morgan';
import logger from './config/winston';

if (cluster.isMaster){
    let cpuCount = require('os').cpus().length
    for(let i=0; i < cpuCount; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.id} died`);
        cluster.fork();
    })
} else {
    const app = express();
    const port = process.env.PORT || 8080
    const router = express.Router();

    app.use(cors())
    app.use('/api', router);
    app.use(morgan('combined', { stream: logger.stream }));
	  app.listen(port, () => console.log(`Worker ${cluster.worker.id} running!`));

    routes(router)
}