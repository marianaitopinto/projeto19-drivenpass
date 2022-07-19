import { prisma } from "../config/database";
import { noteData } from "../services/notesService";

export async function checkTitle(userId: number, title: string) {
  return prisma.note.findFirst({
    where: { userId, title: { equals: title, mode: "insensitive" } },
  });
}

export async function createNote(data: noteData) {
  return prisma.note.create({ data });
}

export async function getAll(userId: number) {
  return prisma.note.findMany({
    where: {
      userId,
    },
  });
}

export async function getNoteById(idNote: number) {
  return prisma.note.findFirst({ where: { id: idNote } });
}
