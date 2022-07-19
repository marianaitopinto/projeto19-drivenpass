import { Request, Response } from "express";

import * as credentialService from "../services/credentialsServices"
import { credentialData } from "../services/credentialsServices";

export async function createCredential(req: Request, res: Response) {
    const { title, url, username, password} : credentialData = req.body; 

    const {id: userId} : { id: number } = res.locals.user;

    console.log(userId);

    await credentialService.createCredential({title, url, username, password, userId});

    res.sendStatus(200);
}

export async function getAllCredentials(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;

    const credentials = await credentialService.getAllCredentials(userId);

    console.log('cheguei aqui')

    res.status(200).send(credentials);

}

export async function getCredentialsById(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;
    const idCredential = parseInt(req.params.idCredential);

    const credential = await credentialService.getCredentialById(userId, idCredential)

    res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;
    const idCredential = parseInt(req.params.idCredential);

    await credentialService.deleteCredential(userId, idCredential)

    res.sendStatus(204);
}