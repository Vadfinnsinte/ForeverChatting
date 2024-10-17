import Joi from "joi"
import { DM } from "../interfaces/DM.js"

export const DMSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        messageText: Joi.string()
            .min(1)
            .required(),
        reciverId: Joi.string()
        .length(24)
        .hex(),
        senderId: Joi.string()
        .length(24)
        .hex()
    }
).unknown(false)

export function isValidDM(dm: DM): boolean {
    let result = DMSchema.validate(dm)
    return !result.error
}