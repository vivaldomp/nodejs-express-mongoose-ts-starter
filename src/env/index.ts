import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT = {
  API: {
    URL: process.env.API_URL || 'http://localhost',
    CONTEXT_SWAGGER: process.env.API_CONTEXT_SWAGGER || '/api',
    CONTEXT_CUSTOMER: process.env.API_CONTEXT_CUSTOMER || '/customers'
  },
  SERVER: {
    PORT: process.env.PORT || 3000
  },
  MONGO_URI: `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DBNAME}`
};

export default ENVIRONMENT;
