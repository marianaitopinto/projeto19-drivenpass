import { Router } from "express";

import { createCredential, getAllCredentials, getCredentialsById, deleteCredential } from "../controllers/credentialsController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { userSchema } from "../schemas/authSchema";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, createCredential);
credentialRouter.get("/credentials", validateToken, getAllCredentials);
credentialRouter.get("/credentials/:idCredential", validateToken, getCredentialsById);
credentialRouter.delete("/credentials/:idCredential", validateToken, deleteCredential)

export default credentialRouter;