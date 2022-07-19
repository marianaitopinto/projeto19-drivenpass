import { Router } from "express";

import { createNote, getAllNotes } from "../controllers/notesController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { validateToken } from "../middlewares/tokenMiddleware";
import { noteSchema } from "../schemas/noteSchema";

const notesRouter = Router();

notesRouter.post("/notes", validateToken, validateSchemaMiddleware(noteSchema), createNote);
notesRouter.get("/notes", validateToken, getAllNotes);


export default notesRouter;