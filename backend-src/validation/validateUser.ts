import Joi from "joi"

import { User } from "../models/User.js"

export const UserSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        username: Joi.string()
            .min(3)
            .max(14)
            .required(),
        password: Joi.string().min(10).required(),
        image: Joi.string().optional(),
        dateOfCreation: Joi.date().required(),
        flair: Joi.string().max(30).optional(),

    }
).unknown(false)
export const changeUserSchema = Joi.defaults(schema => {
    return schema.required()
})
    .object({
        username: Joi.string()
            .min(1)
            .optional(),
        password: Joi.string().min(10).optional(),
        image: Joi.string().optional(),
        dateOfCreation: Joi.date().optional(),
        flair: Joi.string().optional(),

    }
).required().min(1)

export function isValidUser(user: User): boolean {
    let result = UserSchema.validate(user)
    return !result.error
}
export function isValidChangeUser(user: User): boolean {
    let result = changeUserSchema.validate(user)
    return !result.error
}