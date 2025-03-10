import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {GameComp} from "../1_endpoints/GameComp.js";


dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(express.static('public'));

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json())


// start game
routes.get('/api/start/:name', async (req, res) => {
    return GameComp.start(req,res);
});

// play game
routes.get('/api/play/:choice', async (req, res) => {
    return GameComp.play(req,res);
});

// end game
routes.get('/api/stop', async (req, res) => {
    return GameComp.stop(req,res);
});

// catch-all GET route for handling requests to undefined endpoints
routes.get('*', (req, res) => {
    return res.status(404).send('This route does not exist');
});


export {routes}

