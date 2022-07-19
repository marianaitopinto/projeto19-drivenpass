import { Router } from "express";

import { createWifi, getAllWifis, getWifiById, deleteWifi } from "../controllers/wifiController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { wifiSchema } from "../schemas/wifiSchema";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateToken, validateSchemaMiddleware(wifiSchema), createWifi);
wifiRouter.get("/wifi", validateToken, getAllWifis);
wifiRouter.get("/wifi/:idWifi", validateToken, getWifiById);
wifiRouter.delete("/wifi/:idWifi", validateToken, deleteWifi);

export default wifiRouter;