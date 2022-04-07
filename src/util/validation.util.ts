import { Schema } from "express-validator";
import cloneDeep from "clone-deep";

export const setAllValidationsOptional = (schema:object): Schema => {
  const mappingValidations = cloneDeep(schema) as Schema;
  for (let validation in mappingValidations) {
    mappingValidations[validation].optional=true;
  }
  return mappingValidations;
}