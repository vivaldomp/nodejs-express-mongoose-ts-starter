import { ICustomer } from "../../model/customer";
import { UserAuthorized } from "../../guard/user.authorized"

declare module 'express' {
  export interface Request {
    customer?: ICustomer;
    userAuthorized?: UserAuthorized;
  }
}