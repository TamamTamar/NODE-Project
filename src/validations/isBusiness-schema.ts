import Joi from "joi";
import { IIsBusiness } from "../@types/@types";


const isBusinessSchema = Joi.object<IIsBusiness>({
    bizNumber: Joi.number().min(1_000_000).max(9_999_999).required()
});

export default isBusinessSchema;