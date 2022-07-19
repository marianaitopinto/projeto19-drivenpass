import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";
import { AppError } from "../errors/appError";

import * as wifiRepository from "../repositories/wifiRepository";

export type wifiData = Omit<Wifi, "id">;

const cryptr = new Cryptr("my_ultra_secret_jwt_key"); //FIXME

export async function createWifi(data: wifiData) {
  const encryptPassword = cryptr.encrypt(data.password);
  data.password = encryptPassword;

  console.log(data);

  await wifiRepository.createWifi(data);
}

export async function getAllWifis(userId: number) {
  const wifis = await wifiRepository.getAll(userId);

  console.log(wifis, "antes de");

  wifis.map((wifi) => {
    wifi.password = cryptr.decrypt(wifi.password);
    return wifi;
  });

  console.log(wifis, "depois de descriptar");

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
