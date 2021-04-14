import { createLogger, format, transports } from 'winston';
import { PARMS, CONST } from './labels';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export let logger = createLogger({
  level: PARMS.LOG_LEVEL,
  format: combine(
    format.colorize(),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: CONST.APP_NAME },
  transports: [
    new transports.Console()
  ],
});