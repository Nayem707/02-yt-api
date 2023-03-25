import jwt from "jsonwebtoken";

import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accsess_token;

  if (!token) return next(createError(401, "you have no authtication!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "you have no Token validet!"));
    req.user = user;
    next();
  });
};
