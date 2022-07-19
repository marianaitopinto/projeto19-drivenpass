import { Router } from "express";

import authRouter from "./authRouter";
import credentialRouter from "./credentialsRouter";
import notesRouter from "./notesRouter";

const routers = Router();

routers.use(authRouter);
routers.use(credentialRouter);
routers.use(notesRouter);

export default routers;
