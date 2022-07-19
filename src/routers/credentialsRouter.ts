import { Router } from "express";

import { createCredential, getAllCredentials, getCredentialsById } from "../controllers/credentialsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { userSchema } from "../schemas/authSchema";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, createCredential);
credentialRouter.get("/credentials", validateToken, getAllCredentials);
credentialRouter.get("/credentials/:idCredential", validateToken, getCredentialsById);

export default credentialRouter;