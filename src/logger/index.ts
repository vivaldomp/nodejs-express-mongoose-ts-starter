import { createLogger, format, transports } from "winston";

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston

const customFormat = format.printf((info) => {
  // let msg = ; 
  // if (info.meta) {
  //   msg += JSON.stringify(info.meta);
  // }

  const stringifiedRest = JSON.stringify(Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined,
    timestamp: undefined
  }));

  if (stringifiedRest=="{}") {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  } else {
    return `${info.timestamp} ${info.level}: ${info.message} ${stringifiedRest}`;
  }
  
});

export const options = {
    // To see more detailed errors, change this to 'debug'
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.splat(),
      customFormat
    ),
    transports: [
      new transports.Console()
    ],
  }

const logger = createLogger(options);

export default logger;