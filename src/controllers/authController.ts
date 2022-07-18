import { Request, Response } from "express";

import * as authService from "../services/authServices";
import { userData } from "../services/authServices";

export async function signUp(req: Request, res: Response) {
  const { email, password }: userData = req.body;

  await authService.createUser({ email, password });

  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password }: userData = req.body;

  const token = await authService.signIn({ email, password });

  res.status(200).send(token);
}
