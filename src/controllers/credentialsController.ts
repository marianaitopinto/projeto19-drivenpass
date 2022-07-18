import { Request, Response } from "express";

import * as credentialService from "../services/credentialsServices"
import { credentialData } from "../services/credentialsServices";

export async function createCredential(req: Request, res: Response) {
    const { title, url, username, password} : credentialData = req.body; 

    const {id: userId} : { id: number } = res.locals.user;

    console.log(userId);

    await credentialService.createCredential({title, url, username, password, userId});
}