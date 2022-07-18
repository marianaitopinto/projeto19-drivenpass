import { Credential } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository";
import { AppError } from "../errors/appError";
import Cryptr from "cryptr";

export type credentialData = Omit<Credential, "id">;

export async function createCredential(data: credentialData) {
  console.log(data);
  const cryptr = new Cryptr("myTotallySecretKey");
  //FIXMEEEEEEEEE

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
  const cryptr = new Cryptr("myTotallySecretKey");
  //FIXMEEEEEEEEE

  const credentials = await credentialRepository.getAll(userId);

  console.log(credentials, "antes de");

  credentials.map((credential) => {
    credential.password = cryptr.decrypt(credential.password);
    return credential;
  });

  console.log(credentials, "depois de descriptar");

  return credentials;
}
