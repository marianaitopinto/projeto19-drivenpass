import { Router } from "express";

import authRouter from "./authRouter";
import credentialRouter from "./credentialsRouter";

const routers = Router();

routers.use(authRouter);
routers.use(credentialRouter);

export default routers;
