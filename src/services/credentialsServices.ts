import { Credential } from "@prisma/client"
import * as credentialRepository from "../repositories/credentialRepository"
import { AppError } from "../errors/appError";
import Cryptr from "cryptr";

export type credentialData = Omit<Credential, "id">

export async function createCredential(data : credentialData) {
    console.log(data)
    const cryptr = new Cryptr("myTotallySecretKey");
    //FIXMEEEEEEEEE

    const checkCredential = await credentialRepository.checkTitle(data.userId, data.title);
    console.log(checkCredential, "opa")

    if (checkCredential) throw new AppError("Credential title is already in use!", 409);

    data.password = cryptr.encrypt(data.password);

    await credentialRepository.insert(data);
}