import { Router } from "express";

import { createWifi } from "../controllers/wifiController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { cardSchema } from "../schemas/cardSchema";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateToken, createWifi);

export default wifiRouter;