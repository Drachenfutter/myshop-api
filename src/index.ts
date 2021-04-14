import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {routes } from './common/routes';
import { connect } from './common/dataBase';
import { logger } from './common/log';
import { CONST } from './common/labels';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

routes(app);

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  next();
});

const init = async () => { 
  try{
    logger.info('Connecting database...');
    await connect();
    logger.info(`Started on ${CONST.APP_PORT}`);
  }catch(err){
    logger.error('Exiting...');
    process.exit(1);
  }
}

init();

export const server = app.listen(CONST.APP_PORT);