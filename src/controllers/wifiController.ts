import { Request, Response } from "express";
import { wifiData } from "../services/wifiService";

import * as wifiService from "../services/wifiService";

export async function createWifi(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;
    const {title, name, password} : wifiData = req.body;

    await wifiService.createWifi({title, name, password, userId});

    res.sendStatus(201);
}