import { prisma } from "../config/database";
import { credentialData } from "../services/credentialsServices";

export async function checkTitle(userId: number, title: string) {
  return prisma.credential.findFirst({
    where: {
      userId,
      title: { equals: title, mode: "insensitive" },
    },
  });
}

export async function insert(data: credentialData) {
  return prisma.credential.create({ data });
}
