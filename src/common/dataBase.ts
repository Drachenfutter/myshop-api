import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { logger } from "./log";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "superPassword",
  database: process.env.POSTGRES_DB || "postgres",
  entities: ['src/entity/**/*.ts'],
  synchronize: true
};

export let connection: Connection;

export async function connect(): Promise<void>{
  return new Promise((resolve, reject)=>{
    createConnection(config)
      .then((_connection) => {
        connection = _connection;
        logger.info('DataBase connected');
        resolve()
      })
      .catch((err) => {
        const msgError:string = `Unable to connect to DataBase: ${err.message}`;
        logger.error(msgError);
        reject(msgError);
      });
  })
}