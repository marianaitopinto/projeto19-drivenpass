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

export async function getAll(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

export async function getCredential(credentialId: number) {
  return prisma.credential.findFirst({
    where: {
      id: credentialId,
    },
  });
}

export async function deleteCredential(credentialId: number) {
  return prisma.credential.delete({
    where: {
      id: credentialId,
    },
  });
}
