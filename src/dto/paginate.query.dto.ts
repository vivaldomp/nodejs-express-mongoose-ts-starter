import { InternalQuery } from "../model/internal.query";

export interface PaginateQueryDto {
  select?:string;
  sort?:string;
  page?:number;
  limit?:number;
  pagination?:boolean;
  query: InternalQuery;
}