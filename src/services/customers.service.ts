import { PassThrough, Writable, pipeline, WritableOptions } from "stream";
import { PaginateResult } from "mongoose";

import Customer, { ICustomer } from "../model/customer";
import { CreateCustomerDto } from "../dto/create.customer.dto";
import { PatchCustomerDto } from "../dto/patch.customer.dto";
import { PutCustomerDto } from "../dto/put.customer.dto";
import { ErrorApplication } from "../errors/error.application";

import util from "util";
import BufferFileConverter, { TYPE_NUMBER, TYPE_STRING, TYPE_DATE } from "../util/bufferfile.converter.util";
import { PaginateQueryDto } from "../dto/paginate.query.dto";
import { InternalQuery } from "../model/internal.query";

const TextFileTemplate = {
  rowSize : 502, // Position 502 represents end-line
  rowIdentifier: {
    lenght: 2,
    position: 0,
    type: TYPE_STRING,
  },
  layouts: [
    {
      rowID: "01",
      fields: [
        {name:"typeSubscription", lenght:2, position:2, type: TYPE_NUMBER},
        {name:"subscription", lenght:14, position:4, type: TYPE_STRING},
        {name:"name", lenght:40, position:18, type: TYPE_STRING},
        {name:"birthDate", lenght:8, position:58, type: TYPE_DATE, format:"ddmmyyyy"},
        {name:"noteAbout", lenght:100, position:66, type: TYPE_STRING},
      ],
      bindNextRow: true,
    },
    {
      rowID: "02",
      fields: [
        {name:"address", lenght:55, position:2, type: TYPE_STRING},
        {name:"postalCode", lenght:8, position:57, type: TYPE_STRING},
        {name:"city", lenght:15, position:65, type: TYPE_STRING},
        {name:"country", lenght:2, position:79, type: TYPE_STRING},
      ]
    }
  ]
};

const defaultPagination = {
  page: 1,
  limit: 50,
  collation: {
    locale: 'pt'
  }
}

interface ResultImportFile {
  docs: object[],
  totalDocs: number,
}

class SaveDBWriteStream extends Writable {
  private resultImportFile:ResultImportFile;
  private userId:string;
  constructor(result: ResultImportFile, userId: string, opts?: WritableOptions) {
    super(opts);
    this.userId = userId;
    this.resultImportFile = result;

  }
  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void):void {
    (async() => {
      try {
        const customer: CreateCustomerDto = JSON.parse(chunk);
        customer.userId = this.userId;
        const newCustomer:ICustomer =  new Customer(customer);
        await newCustomer.save();
        this.resultImportFile.docs.push(newCustomer);
        callback(); 
      } catch (e) {
        throw e;
      }
    })();
  }
  _final(callback: (error?: Error | null) => void): void {
    this.resultImportFile.totalDocs = this.resultImportFile.docs.length;
    callback();
  }
}

class CustomersService {
  
  async findByID(id:string): Promise<ICustomer> {
    try {
      const customer: ICustomer | null = await Customer.findById(id);
      if (customer == null) {
        throw new ErrorApplication({key:"error.database.not_found", dataModel:{id}});
      }
      return customer;
    } catch (e: any) {
      throw new ErrorApplication({key:"error.database.find"}, e);
    }
  }

  async list(userPagination: PaginateQueryDto): Promise<PaginateResult<ICustomer>> {
    try {
      const options = {
        ...defaultPagination,
        ...userPagination
      }
      const customers: PaginateResult<ICustomer> = await Customer.paginate({...options.query},options);
      return customers;
    } catch (e: any) {
      throw new ErrorApplication({key:"error.database.list"} ,e);
    }
  }

  async create(customer:CreateCustomerDto): Promise<ICustomer> {
    try {
      const newCustomer:ICustomer = new Customer(customer);
      await newCustomer.save();
      return newCustomer;
    } catch (e: any) {
      throw new ErrorApplication({key:"error.database.create", dataModel:{name:customer.name}}, e);
    }
  }

  async deleteByID(query:InternalQuery): Promise<ICustomer> {
    try {
      const customer:ICustomer | null = await Customer.findOne({ _id: query.id, userId: String(query.userId) });
      if (customer == null) {
        throw new ErrorApplication({key:"error.database.not_found", dataModel:{id:query.id}});
      }
      await customer.delete();
      return customer;
    } catch (e: any) {
      throw new ErrorApplication({key:"error.database.delete", dataModel: {id:query.id}}, e);
    }
  }

  async restoreByID(query:InternalQuery): Promise<ICustomer> {
    try {
      const customer:ICustomer | null = await Customer.findOne({ _id: query.id, userId: String(query.userId) });
      if (customer == null) {
        throw new ErrorApplication({key:"error.database.not_found", dataModel:{id:query.id}});
      }
      await customer.restore();
      return customer;
    } catch (e: any) {
      throw new ErrorApplication({key:"error.database.delete", dataModel: {id:query.id}}, e);
    }
  }

  async putByID(query:InternalQuery, customer: PutCustomerDto): Promise<ICustomer> {
    return this.patchByID(query, customer);
  }

  async patchByID(query:InternalQuery, customer: PatchCustomerDto): Promise<ICustomer> {
    try {
      const customerUpdated: ICustomer | null = await Customer.findOneAndUpdate({ _id: query.id, userId: String(query.userId) },customer, {new:true, setDefaultsOnInsert: true});
      if (customer == null) {
        throw new ErrorApplication({key:"error.database.not_found",dataModel:{id:query.id}});
      }
      return customerUpdated!;
    } catch (e: any) {
      throw new ErrorApplication({key: "error.database.update", dataModel:{id:query.id}}, e);
    }
  }

  async uploadTextFile(bufferFile: Buffer, userId: string): Promise<ResultImportFile> {
    try {
      const pipelines: Function = util.promisify(pipeline)

      const bufferFileStream: PassThrough = new PassThrough();
      bufferFileStream.end(bufferFile);

      const result: ResultImportFile = { docs:[], totalDocs:0};
      const saveToDatabase = new SaveDBWriteStream(result, userId);
      const converterTextFile = new BufferFileConverter(TextFileTemplate);
    
      await pipelines(
        bufferFileStream,
        converterTextFile,
        saveToDatabase
      );
      return result;
    } catch(e: any) {
      throw new ErrorApplication({key:"error.unexpected"} ,e);
    }
    
  }

}

export default new CustomersService();