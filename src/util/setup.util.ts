import ENVIRONMENT from "../env";
import mongoose, { Mongoose } from "mongoose";
import logger from "../logger";

const mongoOptions = {
  socketTimeoutMS: 0,
  keepAlive: true, 
  keepAliveInitialDelay: 300000,
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin"
}

process.on('SIGTERM', () => {
  mongoose.disconnect().then(() => {
      process.exit();
  });
});

export async function startMongo(): Promise<Mongoose>{
  logger.info(`Trying connect to mongo...`);
  const conn = mongoose.connect(ENVIRONMENT.MONGO_URI, mongoOptions);
  logger.info(`Mongo connected to: ${ENVIRONMENT.MONGO_URI}`);
  return conn;
}

