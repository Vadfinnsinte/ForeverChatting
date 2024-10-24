import Joi from "joi"
import { RoomMessage } from "../models/RoomMessage"

export const RoomMessageSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        messageText: Joi.string()
            .min(1)
            .required(),
        roomName: Joi.string().required(),
        senderName: Joi.string().optional(),
        name: Joi.string().optional(),
        date: Joi.date().required(),
        likes: Joi.number().optional()
    }
).unknown(false)

export function isValidRoomMessage(message: RoomMessage): boolean {
    let result = RoomMessageSchema.validate(message)
    return !result.error
}