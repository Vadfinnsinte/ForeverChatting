import Joi from "joi"

import { User } from "../models/User.js"

export const UserSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        username: Joi.string()
            .min(1)
            .required(),
        password: Joi.string().min(10).required(),
        image: Joi.string().optional(),
        dateOfCreation: Joi.date().required(),
        flair: Joi.string().optional(),

    }
).unknown(false)

export function isValidUser(user: User): boolean {
    let result = UserSchema.validate(user)
    return !result.error
}