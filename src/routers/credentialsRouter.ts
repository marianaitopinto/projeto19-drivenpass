import { Router } from "express";

import { createCredential } from "../controllers/credentialsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { userSchema } from "../schemas/authSchema";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, createCredential);

export default credentialRouter;