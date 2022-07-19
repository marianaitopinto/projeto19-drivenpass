import { Request, Response } from "express";
import { wifiData } from "../services/wifiService";

import * as wifiService from "../services/wifiService";

export async function createWifi(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const { title, name, password }: wifiData = req.body;

  await wifiService.createWifi({ title, name, password, userId });

  res.sendStatus(201);
}

export async function getAllWifis(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const wifis = await wifiService.getAllWifis(userId);

  console.log(wifis);

  res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const idWifi = parseInt(req.params.idWifi);

  const wifi = await wifiService.getWifiById(userId, idWifi);

  res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
    const {id: userId} : { id: number } = res.locals.user;
    const idWifi = parseInt(req.params.idWifi);

    await wifiService.deleteWifi(userId, idWifi)

    res.sendStatus(204);
}