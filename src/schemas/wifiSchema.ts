import joi from "joi";
import { wifiData } from "../services/wifiService";

export const wifiSchema = joi.object<wifiData>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});