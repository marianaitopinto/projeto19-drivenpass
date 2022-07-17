import { Request, Response } from "express";

import * as authService from "../services/authServices"
import { userData } from "../services/authServices";

export async function signUp(req: Request, res: Response) {
  const { email, password }: userData = req.body;

  await authService.createUser( {email, password})

  res.sendStatus(201);
}
