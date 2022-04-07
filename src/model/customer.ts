import { model, Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete, { SoftDeleteDocument } from "mongoose-delete";
import timeStamps from "./timestamps.plugin";

export type ICustomer = Document & SoftDeleteDocument & {
  name: string;
  subscription: string;
  email: string;
  phone: string;
  company: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  addressDistrict: string;
  city: string;
  country: string;
  birthDate: string;
  noteAbout: string;
  userId: string;
  // typeSubscription: number;
}


const CustomerSchema = new Schema(
  {
    name: {
      type: String,
    },
    subscription: {
      type: String,
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    addressNumber: {
      type: String,
      default: "",
    },
    addressDistrict: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },    
    birthDate: {
      type: String,
      default: "",
    },
    noteAbout: {
      type: String,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId
    },
    /*typeSubscription: {
      type: Number,
    }*/
  },
  { strict: true, versionKey: false, timestamps: false }
);

CustomerSchema.plugin(mongoosePaginate);
CustomerSchema.plugin(mongooseDelete, { deletedAt : true });
CustomerSchema.plugin(timeStamps);

interface CustomerModel<T extends Document> extends PaginateModel<T> {}

const Customer: CustomerModel<ICustomer> = model<ICustomer, CustomerModel<ICustomer>>("customers", CustomerSchema) as CustomerModel<ICustomer>;

export default Customer;
