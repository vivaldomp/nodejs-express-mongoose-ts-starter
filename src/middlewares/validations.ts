import { Request, Response, NextFunction } from "express";
import { validationResult, checkSchema, Schema, ValidationError } from "express-validator";
import { ErrorValidation } from "../errors/error.validation";

export const translateErrors = (req: Request, errors: ValidationError[]):ValidationError[] => {
  errors.forEach((error:ValidationError) => {
    if (error.msg instanceof ErrorValidation) {
      error.msg = req.t(error.msg.messageI18N.key, error.msg.messageI18N.dataModel);
    } else {
      error.msg = req.t(error.msg);
    }
  });
  return errors;
}

const validate = (schema: object) => {
  const validations = checkSchema(schema as Schema);
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      message: req.t("error.input_data"),
      errors: translateErrors(req, errors.array()),
      errortype: "Input"
    });
  };
}

export default validate;
