import Joi from "joi"
import { DM } from "../models/DM.js"

export const DMSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        messageText: Joi.string()
            .min(1)
            .required(),
        reciverName: Joi.string().required(),
        senderName: Joi.string().required(),
        date: Joi.date().optional()
    }
).unknown(false)

export function isValidDM(dm: DM): boolean {
    let result = DMSchema.validate(dm)
    return !result.error
}