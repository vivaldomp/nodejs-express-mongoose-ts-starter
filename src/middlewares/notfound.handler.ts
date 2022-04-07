import { Request, Response, NextFunction } from "express";
import { ErrorApplication } from "../errors/error.application";
import ENVIRONMENT from "../env";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.route) {
    const { url } = req;
    throw new ErrorApplication({
      key:"error.route.not_found",
      dataModel:{
        route:url,
        api_url: `${ENVIRONMENT.API.URL}${ENVIRONMENT.API.CONTEXT_SWAGGER}`}
      });
  } else {
    next();
  }
}

export default notFoundHandler;