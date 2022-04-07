import { Request, Response, NextFunction } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
import { translateErrors } from "../middlewares/validations";
import { HEADERS } from "../util";
import { authHeadersValidaton } from "./auth.headers.schema";

const authGuardHandler = async (req: Request, res: Response, next: NextFunction) => {
  const validations = checkSchema(authHeadersValidaton as Schema);
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const name = req.get(HEADERS.OAUTH.USER.NAME)!;
    const _id = req.get(HEADERS.SERVICE.API.USER.ID)!;
    const userAuthorized = {
      _id,
      name,
    }

    req.userAuthorized = userAuthorized;
  } else {
    res.status(400).json({
      message: req.t("error.headers_invalid"),
      errors: translateErrors(req, errors.array()),
      errortype: "Input"
    });
  }
  next();
}

export default authGuardHandler;