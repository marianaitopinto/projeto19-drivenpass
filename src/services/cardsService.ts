import Cryptr from "cryptr";
import { Card } from "@prisma/client";
import { AppError } from "../errors/appError";

import * as cardRepository from "../repositories/cardsRepository";

export type cardData = Omit<Card, "id">;

const cryptr = new Cryptr("my_ultra_secret_jwt_key"); //FIXME

export async function createCard(data: cardData, userId: number) {
  const checkTitle = await cardRepository.checkTitle(userId, data.title);
  console.log("cheguei 1");
  if (checkTitle) throw new AppError("Card title is already in use!", 409);
  console.log("cheguei 2");
  console.log(data);
  console.log(typeof userId);

  data.userId = userId;
  console.log(data.userId);

  const encryptCvv = cryptr.encrypt(data.cvv);
  const encryptPassword = cryptr.encrypt(data.password);
  console.log("cheguei 3");
  data.cvv = encryptCvv;
  data.password = encryptPassword;
  console.log("cheguei 4");
  console.log(data);

  await cardRepository.createCard(data);
  console.log("sai daqui");
  return;
}

export async function getAllCards(userId: number) {
  const notes = await cardRepository.getAll(userId);

  return notes;
}

export async function getCardById(userId: number, idCard: number) {
  const card = await cardRepository.getCardById(idCard);
  if (!card) throw new AppError("Card not found!", 404);

  if (card.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this card", 401);

  return card;
}
