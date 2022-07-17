import { Router } from "express";

import { signUp } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema), signUp);

export default authRouter;