import { Router } from "express";

import authRouter from "./authRouter";
import credentialRouter from "./credentialsRouter";
import notesRouter from "./notesRouter";
import cardsRouter from "./cardsRouter";

const routers = Router();

routers.use(authRouter);
routers.use(credentialRouter);
routers.use(notesRouter);
routers.use(cardsRouter);

export default routers;
