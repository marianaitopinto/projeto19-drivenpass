import { prisma } from "../config/database";
import { wifiData } from "../services/wifiService";

export async function createWifi(data: wifiData) {
  return prisma.wifi.create({ data });
}

export async function getAll(userId: number) {
  return prisma.wifi.findMany({
    where: {
      userId,
    },
  });
}
