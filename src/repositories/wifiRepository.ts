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

export async function getWifi(wifiId: number) {
  return prisma.wifi.findFirst({
    where: {
      id: wifiId,
    },
  });
}

export async function deleteWifi(wifiId: number) {
  return prisma.wifi.delete({
    where: {
      id: wifiId,
    },
  });
}
