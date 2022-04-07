import { Request, Response, NextFunction } from "express";
import { ErrorApplication } from "../errors/error.application";
import logger from "../logger";

interface MessageError {
  message: string,
  data: object | string,
  error: object | string,
  errorType: string
}

const convertErrorToJson = (req: Request, error: ErrorApplication):object => {
  return {
    message: req.t(error.messageI18N.key, error.messageI18N.dataModel),
    data: error.messageI18N.dataModel,
    error: error.cause instanceof ErrorApplication? convertErrorToJson(req, error.cause) : error.cause?.message,
    errortype: "Application"
  };
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let messageError: MessageError;
  if (error instanceof ErrorApplication) {
    messageError = convertErrorToJson(req, error as ErrorApplication) as MessageError;
  } else {
    messageError = { message: error.message, data: "", error: JSON.stringify(error.stack), errorType: "System"};
  }
  logger.error("%s %j", messageError.message, messageError);
  res.status(500)
      .json(messageError);
  next();
}

export default errorHandler;