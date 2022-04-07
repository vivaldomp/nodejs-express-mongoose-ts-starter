import { isValidObjectId, Types } from "mongoose";
import { ErrorValidation } from "../errors/error.validation";
import Customer from "../model/customer";
import { setAllValidationsOptional } from "../util/validation.util";

export const idParamValidation = {
  "id": {
    custom: {
      options: (value:string) => {
        if (value) {
          if (isValidObjectId(value) && new Types.ObjectId(value).equals(value)) {
            return { id: value };
          } else {
            throw ("error.validation.customer.id.wrong");
          }
        } else {
          throw ("error.validation.customer.id.empty");
        }
      }
    },
  }
};

export const createValidation = {
  name: {
    notEmpty: {
      errorMessage: "error.validation.customer.name.empty"
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "error.validation.customer.name.length"
    }
  },
  subscription: {
    notEmpty: {
      errorMessage: "error.validation.customer.subscription.empty"
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "error.validation.customer.subscription.length"
    }
  },
  email:{
    optional: true,
    isEmail: {
      errorMessage: "error.validation.customer.email.invalid"
    }
  },
  phone:{
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.phone.type"
  },
  company: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.company.type"
  },
  postalCode: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.postalcode.type"
  },
  address: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.address.type"
  },
  addressNumber: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.address_number.type"
  },
  addressDistrict: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.address_district.type"
  },
  city: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.city.type"
  },
  country: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.country.type"
  },
  birthDate: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.birthdate.type"
  },
  noteAbout: {
    optional: true,
    isString: true,
    errorMessage: "error.validation.customer.noteabout.type"
  },
  /*typeSubscription: {
    custom: {
      options: (value:number) => {
        if (value) {
          if ([1,2].includes(value)) {
            return { typeSubscription: value };
          } else {
            throw ("error.validation.customer.typesubscription.not_exist");
          }
        } else {
          throw ("error.validation.customer.typesubscription.empty");
        }
      }
    },
  },*/
};

export const putValidation = {
  ...createValidation,
};

export const patchValidation = setAllValidationsOptional(createValidation);

const customValidateFieldsQuery = (operation:string) => (value:string) => {
  const matchedFields: RegExpMatchArray =value.match(/([\w]+)/g)!;
  const fieldsInvalid = matchedFields.reduce((result:string, field:string):string =>
    (result + " " + (Customer.schema.path(field) ? "" : field)).trim()
  ,"");
  if (fieldsInvalid) {
    throw new ErrorValidation({key:`error.pagination.option.${operation}.invalid`, dataModel: {fields: fieldsInvalid, count: fieldsInvalid.length }});
  } else {
    return { [operation]: value };
  }
};

export const paginateValidaton = {
  select: {
    optional: true,
    custom: {
      options: customValidateFieldsQuery("select")
    }
  },
  sort: {
    optional: true,
    custom: {
      options: customValidateFieldsQuery("sort")
    }
  },
  page: {
    optional: true,
    in: "query",
    isInt: true,
    errorMessage: "error.pagination.option.page.type",
  },
  limit: {
    optional: true,
    in: "query",
    isInt: true,
    errorMessage: "error.pagination.option.limit.type"
  },
  pagination: {
    optional: true,
    in: "query",
    isBoolean: true,
    toBoolean: true,
    errorMessage: "error.pagination.option.pagination.type"
  }
};