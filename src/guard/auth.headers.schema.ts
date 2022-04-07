import { HEADERS } from "../util";

export const authHeadersValidaton = {
    [HEADERS.SERVICE.API.USER.ID]: {
      in: "headers",
      notEmpty: true,
      errorMessage: "error.header.user_id.empty",
    },
  };