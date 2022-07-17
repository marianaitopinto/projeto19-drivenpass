import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository"
import { AppError } from "../errors/appError";

export type userData = Omit<User, "id">

const SALT_ROUNDS = 10;

export async function createUser( {email, password} : userData) {
    const checkEmail = await authRepository.findUserByEmail(email);
    if (checkEmail) throw new AppError("E-mail is already registered", 409);

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await authRepository.insertUser({email, password: passwordHash})
}