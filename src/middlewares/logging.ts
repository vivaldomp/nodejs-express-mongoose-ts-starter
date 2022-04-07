import expressWinston from "express-winston";
import colors from "colors";

import { options } from "../logger";

export const requestLogging = expressWinston.logger({
  ...options,
  meta: true,
  msg: (req, res) => {
    let statusColor: colors.Color = colors.green;
    if (res.statusCode >= 500) {
      statusColor = colors.red;
    } else if (res.statusCode >= 400) {
      statusColor = colors.yellow;
    } else if (res.statusCode >= 300) {
      statusColor = colors.cyan;
    };
    const statusCodeColor:string = statusColor(`${res.statusCode}`);
    return `HTTP {{req.method}} {{req.url}} ${statusCodeColor} {{res.responseTime}}ms`;
  },
  //"HTTP {{req.method}} {{req.url}} {{res.coloredRes.statusCode}} {{res.responseTime}}ms",
  expressFormat: false,
  colorize: false,
  statusLevels: true,
});

export const errorLogging = expressWinston.errorLogger(options);