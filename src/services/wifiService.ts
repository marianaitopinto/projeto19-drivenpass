import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";
import { AppError } from "../errors/appError";
import "dotenv/config";

import * as wifiRepository from "../repositories/wifiRepository";

export type wifiData = Omit<Wifi, "id">;

const cryptr = new Cryptr(process.env.JWT_SECRET as string);

export async function createWifi(data: wifiData) {
  const encryptPassword = cryptr.encrypt(data.password);
  data.password = encryptPassword;

  await wifiRepository.createWifi(data);
}

export async function getAllWifis(userId: number) {
  const wifis = await wifiRepository.getAll(userId);

  wifis.map((wifi) => {
    wifi.password = cryptr.decrypt(wifi.password);
    return wifi;
  });

  return wifis;
}

export async function getWifiById(userId: number, idWifi: number) {
  const wifi = await wifiRepository.getWifi(idWifi);
  if (!wifi) throw new AppError("Wifi not found!", 404);

  if (wifi.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this wifi", 401);

  wifi.password = cryptr.decrypt(wifi.password);

  return wifi;
}

export async function deleteWifi(userId: number, idWifi: number) {
  const wifi = await wifiRepository.getWifi(idWifi);
  if (!wifi) throw new AppError("Credential not found!", 404);

  if (wifi.userId !== userId)
    throw new AppError("Unauthorized! Invalid token for this wifi", 401);

  await wifiRepository.deleteWifi(idWifi);

  return;
}
