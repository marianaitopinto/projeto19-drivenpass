import Cryptr from "cryptr";
import { Card } from "@prisma/client";
import { AppError } from "../errors/appError";

import * as cardRepository from "../repositories/cardsRepository";

export type cardData = Omit<Card, "id">;

const cryptr = new Cryptr("my_ultra_secret_jwt_key"); //FIXME

export async function createCard(data: cardData, userId: number) {
  const checkTitle = await cardRepository.checkTitle(userId, data.title);
  if (checkTitle) throw new AppError("Card title is already in use!", 409);

  data.userId = userId;

  data.cvv = cryptr.encrypt(data.cvv);
  data.password = cryptr.encrypt(data.password);

  await cardRepository.createCard(data);
  return;
}

export async function getAllCards(userId: number) {
  const notes = await cardRepository.getAll(userId);

  notes.map((note) => {
    note.password = cryptr.decrypt(note.password);
    note.cvv = cryptr.decrypt(note.cvv);
    return note;
  });

  return notes;
}

export async function getCardById(userId: number, idCard: number) {
  const card = await cardRepository.getCardById(idCard);
  if (!card) throw new AppError("Card not found!", 404);

  if (card.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this card", 401);

  card.password = cryptr.decrypt(card.password);
  card.cvv = cryptr.decrypt(card.cvv);

  return card;
}

export async function deleteCard(userId: number, idCard: number) {
  const card = await cardRepository.getCardById(idCard);
  if (!card) throw new AppError("Card not found!", 404);

  if (card.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this card", 401);

  await cardRepository.deleteCard(idCard);

  return;
}
