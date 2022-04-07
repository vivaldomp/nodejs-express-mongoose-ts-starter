import { Request, Response, NextFunction } from "express";
import { matchedData, Location } from "express-validator";
import customersService from "../services/customers.service";
import { ICustomer } from "../model/customer";
import { CreateCustomerDto } from "../dto/create.customer.dto";
import { PutCustomerDto } from "../dto/put.customer.dto";
import { PatchCustomerDto } from "../dto/patch.customer.dto";
import { PaginateQueryDto } from "../dto/paginate.query.dto";

class CustomersController {

  async extractByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = matchedData(req, {locations: ["params" as Location]});
    try {
      const customer: ICustomer = await customersService.findByID(id);
      req.customer = customer;
      next();
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const pagination = matchedData(req, {locations: ["query" as Location]}) as PaginateQueryDto;
    pagination.query = { userId: req.userAuthorized?._id! }
    return res.status(200).json(await customersService.list(pagination));
  }

  async findByID (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const customer = req.customer;
    return res.status(200).json(customer);
  }

  async create (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const customer = matchedData(req, {locations: ["body" as Location], includeOptionals: true}) as CreateCustomerDto;
    customer.userId = req.userAuthorized?._id!;
    return res.status(200).json(await customersService.create(customer));
  }

  async deleteByID (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const query = { id: req.customer?.id, userId: req.userAuthorized?._id! }
    return res.status(200).json(await customersService.deleteByID(query));
  }

  async restoreByID (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const query = { id: req.customer?.id, userId: req.userAuthorized?._id! }
    return res.status(200).json(await customersService.restoreByID(query));
  }

  async putByID (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const customer = matchedData(req, {locations: ["body" as Location]}) as PutCustomerDto;
    const query = { id: req.customer?.id, userId: req.userAuthorized?._id! }
    return res.status(200).json(await customersService.putByID(query, customer));
  }
  async patchByID (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const customer = matchedData(req, {locations: ["body" as Location]}) as PatchCustomerDto; // includeOptionals: true
    const query = { id: req.customer?.id, userId: req.userAuthorized?._id! }
    return res.status(200).json(await customersService.patchByID(query, customer));
  }

  async uploadTextFile (req: Request, res:Response ): Promise<Response<any, Record<string, any>>> {
    const userId = req.userAuthorized?._id!;
    return res.status(200).json(await customersService.uploadTextFile(req.file!.buffer, userId));
  }

}

export default new CustomersController();