import {routes} from './0_routes/routes.js';


const port = 4000;


const server = routes.listen(port, () =>{
    console.log('This server is listening at port:' + port);
} );



