import { Router } from "express";

import { createCard, getAllCards, getCardById } from "../controllers/cardsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { cardSchema } from "../schemas/cardSchema";

const cardsRouter = Router();

cardsRouter.post("/cards", validateToken, createCard);
cardsRouter.get("/cards", validateToken, getAllCards);
cardsRouter.get("/cards/:idCard", validateToken, getCardById);

export default cardsRouter;