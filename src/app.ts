import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routers/MasterRouter';
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;

}

// initialize server app
const server = new Server();

server.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.app.use('/api', server.router);


// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
