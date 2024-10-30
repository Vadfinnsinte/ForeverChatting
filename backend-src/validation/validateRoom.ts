import Joi from "joi"
import { Room } from "../models/Room.js"


export const RoomSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        name: Joi.string()
            .min(1)
            .required(),
        status: Joi.boolean().required(),
    
    }
).unknown(false)

export function isValidRoom(room: Room): boolean {
    let result = RoomSchema.validate(room)
    return !result.error
}