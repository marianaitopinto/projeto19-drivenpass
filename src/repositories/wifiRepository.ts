import { prisma } from "../config/database";
import { wifiData } from "../services/wifiService";

export async function createWifi(data: wifiData) {
    return prisma.wifi.create({ data });
  }