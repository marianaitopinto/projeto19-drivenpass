import { Credential } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository";
import { AppError } from "../errors/appError";
import Cryptr from "cryptr";
import "dotenv/config";

export type credentialData = Omit<Credential, "id">;

const cryptr = new Cryptr(process.env.CRYPTR_KEY as string);

export async function createCredential(data: credentialData) {
  const checkCredential = await credentialRepository.checkTitle(
    data.userId,
    data.title
  );

  if (checkCredential)
    throw new AppError("Credential title is already in use!", 409);

  data.password = cryptr.encrypt(data.password);

  await credentialRepository.insert(data);
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.getAll(userId);

  credentials.map((credential) => {
    credential.password = cryptr.decrypt(credential.password);
    return credential;
  });

  return credentials;
}

export async function getCredentialById(userId: number, idCredential: number) {
  const credential = await credentialRepository.getCredential(idCredential);
  if (!credential) throw new AppError("Credential not found!", 404);

  if (credential.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this credential", 401);

  credential.password = cryptr.decrypt(credential.password);

  return credential;
}

export async function deleteCredential(userId: number, idCredential: number) {
  const credential = await credentialRepository.getCredential(idCredential);
  if (!credential) throw new AppError("Credential not found!", 404);

  if (credential.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this credential", 401);

  await credentialRepository.deleteCredential(idCredential);

  return;
}
