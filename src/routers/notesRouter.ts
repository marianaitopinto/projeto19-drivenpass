import { Router } from "express";

import { createNote } from "../controllers/notesController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { noteSchema } from "../schemas/noteSchema";

const notesRouter = Router();

notesRouter.post("/notes", validateToken, validateSchemaMiddleware(noteSchema), createNote);

export default notesRouter;