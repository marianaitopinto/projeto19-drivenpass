import { prisma } from "../config/database";
import { cardData } from "../services/cardsService";

export async function checkTitle(userId: number, title: string) {
  return prisma.card.findFirst({
    where: { userId, title: { equals: title, mode: "insensitive" } },
  });
}

export async function createCard(data: cardData) {
  return prisma.card.create({ data });
}

export async function getAll(userId: number) {
  return prisma.card.findMany({
    where: {
      userId,
    },
  });
}

export async function getCardById(idCard: number) {
  return prisma.card.findFirst({ where: { id: idCard } });
}