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


/**
 * Endpoint to start the game.
 * Receives a GET request with the player's name as a parameter.
 */
routes.get('/api/start/:name', async (req, res) => {
    return GameComp.start(req,res);
});


/**
 * Endpoint to play the game.
 * Receives a GET request with the player's choice as a parameter.
 */
routes.get('/api/play/:choice', async (req, res) => {
    return GameComp.play(req,res);
});


/**
 * Endpoint to stop the game.
 * Receives a GET request without any parameters.
 */
routes.get('/api/stop', async (req, res) => {
    return GameComp.stop(req,res);
});


/**
 * catch-all GET route that returns a 404 error for undefined get-endpoints
 */
routes.get('*', (req, res) => {
    return res.status(404).send('This route does not exist');
});


export {routes}

