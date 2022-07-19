import { Note } from "@prisma/client";
import { AppError } from "../errors/appError";

import * as noteRepository from "../repositories/notesRepository";

export type noteData = Omit<Note, "id">;

export async function createNote(data: noteData) {
  const checkTitle = await noteRepository.checkTitle(data.userId, data.title);

  if (checkTitle) throw new AppError("Note title is already in use!", 409);

  await noteRepository.createNote(data);
}

export async function getAllNotes(userId: number) {
  
    const notes = await noteRepository.getAll(userId);
  
  
    return notes;
  }