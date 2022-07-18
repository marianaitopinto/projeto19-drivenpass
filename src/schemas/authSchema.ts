import joi from "joi";
import { userData } from "../services/authServices";

export const userSchema = joi.object<userData>({
  email: joi.string().required(),
  password: joi.string().min(10).required(),
});
