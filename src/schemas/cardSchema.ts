import joi from "joi";
import { cardData } from "../services/cardsService";

export const cardSchema = joi.object<cardData>({
  title: joi.string().required(),
  number: joi.string().length(16).required(),
  name: joi.string().required(),
  cvv: joi
    .string()
    .pattern(/^[0-9]{3}/)
    .required(),
  expiration: joi
    .string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})/)
    .required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("debit", "credit", "creditAndDebit").required(),
});
