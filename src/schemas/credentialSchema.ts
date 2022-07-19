import joi from "joi";
import { credentialData } from "../services/credentialsServices";

export const credentialSchema = joi.object<credentialData>({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});