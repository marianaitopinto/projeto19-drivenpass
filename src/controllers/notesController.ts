import { Request, Response } from "express";
import { noteData } from "../services/notesService";

import * as notesService from "../services/notesService";

export async function createNote(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;
    const {title, note} : noteData = req.body;

    await notesService.createNote({title, note, userId});

    res.sendStatus(201);
}