import express, { json, urlencoded, Express } from 'express';
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import favicon from "serve-favicon";
import path from "path";

import ENVIRONMENT from "./env";
import CustomersRoutes from "./routes/customers.routes";
import swagger from "./middlewares/swagger";
import i18n from "./middlewares/i18next";
import notFoundHandler from "./middlewares/notfound.handler";
import { requestLogging, errorLogging } from "./middlewares/logging";
import errorHandler from "./middlewares/error.handler";
import authGuardHandler from './guard/auth.guard.handler';

class Application {

  private instance: Express;
  private routes: any;
  constructor() {
    this.instance = express();
    this.routes = {
      customers: new CustomersRoutes()
    }
  }

  getInstance(): Express {
    this.setupPreMiddlewares();
    this.setupSwagger();
    this.setupRoutes();
    this.setupPosMiddlewares();
    
    return this.instance;
  }

  private setupPreMiddlewares(): void {
    this.instance.use(helmet());
    this.instance.use(cors());
    this.instance.use(compress());
    this.instance.use(json());
    this.instance.use(urlencoded({ extended: true }));
    this.instance.use(i18n());
    if (process.env.NODE_ENV!=="test") {
      this.instance.use(requestLogging);
    }
    this.instance.use(favicon(path.join(__dirname, "../public", "favicon.png")));
    if (process.env.NODE_ENV!="production") {
      this.instance.use("/", express.static("public"));
    }
  }

  private setupPosMiddlewares(): void {
    this.instance.use(errorLogging);
    this.instance.use(notFoundHandler);
    this.instance.use(errorHandler);
  }

  private setupRoutes(): void {
    this.instance.use(authGuardHandler);
    this.instance.use(ENVIRONMENT.API.CONTEXT_CUSTOMER, this.routes.customers.getRoutes());
  }

  private setupSwagger(): void {
    swagger(this.instance);
  }

}

export default new Application().getInstance();