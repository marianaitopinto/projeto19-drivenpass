import { prisma } from "../config/database";
import { userData } from "../services/authServices";

export async function findUserByEmail(email: string) {
  return prisma.user.findFirst({ where: { email } });
}

export async function insertUser(user: userData) {
    return prisma.user.create({ data: user });
}