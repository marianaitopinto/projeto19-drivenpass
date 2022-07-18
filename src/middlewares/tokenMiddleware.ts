import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

export default async function handleError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  //const JWT_TOKEN = process.env.JWT_SECRET;
  //FIXMEE
  
  if (!token) throw new AppError("Unauthorized! There is no token.", 401);

  const JWT_SECRET="my_ultra_secret_jwt_key"
  const user = jwt.verify(token, JWT_SECRET);

  if (!user) throw new AppError("User not found.", 401);

  res.locals.user = user;
  next();
}
