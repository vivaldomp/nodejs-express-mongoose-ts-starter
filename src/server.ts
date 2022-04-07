import app from './app';
import ENVIRONMENT from './env';
import { startMongo } from "./util/setup.util";
import logger from "./logger";


process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

const server = (async ()=> {
  try {
    await startMongo();
    const appInstance = app.listen(ENVIRONMENT.SERVER.PORT, () => {
      logger.info(`Service API running [${process.env.NODE_ENV || 'localhost'}] listen on port [${ENVIRONMENT.SERVER.PORT}].`);
    });
    appInstance.on('error', (e)=> {
      logger.error(e);
      process.exit(1);
    })
    return appInstance;
  } catch (e: any) {
    logger.error("An error ocurred in SETUP. The service WAS NOT STARTED. Error message: " + e.message);
    logger.error(e);
  }
})();

export default server;