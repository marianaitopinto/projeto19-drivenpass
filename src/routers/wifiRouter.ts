import { Router } from "express";

import { createWifi, getAllWifis, getWifiById } from "../controllers/wifiController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { cardSchema } from "../schemas/cardSchema";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateToken, createWifi);
wifiRouter.get("/wifi", validateToken, getAllWifis);
wifiRouter.get("/wifi/:idWifi", validateToken, getWifiById);


export default wifiRouter;