import { Router } from "express";

import { signUp, signIn } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { userSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(userSchema), signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(userSchema), signIn);

export default authRouter;
