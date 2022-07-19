import joi from "joi";
import { noteData } from "../services/notesService";

export const noteSchema = joi.object<noteData>({
  title: joi.string().max(50).required(),
  note: joi.string().max(1000).required(),
});