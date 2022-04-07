import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
// import Customer, { ICustomer } from "../src/model/customer";
// import mongoose from "mongoose";

export class InitDB implements MigrationInterface {
  public async up(db: Db): Promise<any> {
     db.createCollection('customers');
    // (mongoose.connection.db as any) = db;
    // const customer = {
    //   typeSubscription:1,
    //   subscription: "86590847134",

    // }
    // const newCustomer:ICustomer = new Customer(customer);
    // await newCustomer.save();
  }

  public async down(db: Db): Promise<any> {
    db.dropCollection('customers');
  }
}
