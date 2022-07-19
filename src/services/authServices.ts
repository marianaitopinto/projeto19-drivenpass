import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository";
import { AppError } from "../errors/appError";

export type userData = Omit<User, "id">;

const SALT_ROUNDS = 10;

export async function createUser({ email, password }: userData) {
  const checkEmail = await authRepository.findUserByEmail(email);
  if (checkEmail) throw new AppError("E-mail is already registered", 409);

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await authRepository.insertUser({ email, password: passwordHash });
}

export async function signIn({ email, password }: userData) {
  const user = await authRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new AppError("E-mail or password is incorrect", 401);

  const token = await generateToken(user);

  return token;
}

async function generateToken(user: User) {
  const JWT_SECRET = "my_ultra_secret_jwt_key";
  //FIX ME!!!!!!!!!
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  return token;
}
