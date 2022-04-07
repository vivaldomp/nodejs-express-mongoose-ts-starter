import { Router } from "express";
import customersController from "../controllers/customers.controller";
import validate from "../middlewares/validations";
import { idParamValidation, createValidation, patchValidation, putValidation, paginateValidaton } from "../validations/customers.schema";
import uploads from "../util/upload.util";

export default class CustomersRoutes {
  private routes: Router;
  
  constructor() {
    this.routes = Router();
  }

  public getRoutes():Router {
    // Extract ID Customer
    this.routes.post("/upload/textfile", uploads.single('textFile'),
      customersController.uploadTextFile);

    this.routes.use("/:id",
      validate(idParamValidation),
      customersController.extractByID);

    // Create Customer
    this.routes.post("/",
      validate(createValidation),
      customersController.create);
    
    // List all Customers
    this.routes.get("/",
      validate(paginateValidaton),
      customersController.list);

    // Get CustomerByID
    this.routes.get("/:id",
      customersController.findByID);

    // Remove customer by ID
    this.routes.delete("/:id",
      customersController.deleteByID);

    // Restore Payment by ID
    this.routes.post("/:id/restore",
      customersController.restoreByID);

    // Update customer by ID
    this.routes.put("/:id",
      validate(putValidation),
      customersController.putByID);

    // Update fields customer by ID
    this.routes.patch("/:id",
      validate(patchValidation),
      customersController.patchByID);

    return this.routes;
  }

}