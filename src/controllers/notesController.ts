import { Request, Response } from "express";
import { noteData } from "../services/notesService";

import * as notesService from "../services/notesService";

export async function createNote(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const { title, note }: noteData = req.body;

  await notesService.createNote({ title, note, userId });

  res.sendStatus(201);
}

export async function getAllNotes(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const notes = await notesService.getAllNotes(userId);

  res.status(200).send(notes);
}

export async function getNoteById(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const idNote = parseInt(req.params.idNote);

  const note = await notesService.getNoteById(userId, idNote);

  res.status(200).send(note);
}

export async function deleteNote(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const idNote = parseInt(req.params.idNote);

  await notesService.deleteNote(userId, idNote);

  res.sendStatus(204);
}
