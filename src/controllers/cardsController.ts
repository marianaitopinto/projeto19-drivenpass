import { Request, Response } from "express";
import { cardData } from "../services/cardsService";

import * as cardsService from "../services/cardsService";

export async function createCard(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const data: cardData = req.body;

  await cardsService.createCard(data, userId);

  res.sendStatus(201);
}

export async function getAllCards(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const cards = await cardsService.getAllCards(userId);

  res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const idCard = parseInt(req.params.idCard);

  const card = await cardsService.getCardById(userId, idCard);

  res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const idCard = parseInt(req.params.idCard);

  await cardsService.deleteCard(userId, idCard);

  res.sendStatus(204);
}
