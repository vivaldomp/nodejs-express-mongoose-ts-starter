import { mongoMigrateCli } from 'mongo-migrate-ts';
import dotenv from 'dotenv';

dotenv.config();

mongoMigrateCli({
  uri: `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017`,
  database: `${process.env.MONGO_DBNAME}`,
  migrationsDir: __dirname,
  migrationsCollection: 'migrations_collection',
  options: {
    socketTimeoutMS: 0,
    keepAlive: true, 
    keepAliveInitialDelay: 300000,
  }
});