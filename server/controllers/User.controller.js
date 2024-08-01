import client from '../config/client.js'
import expressAsyncHandler from 'express-async-handler'
import uservalidateObj from '../validators/User.joi.js'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import { findUserByEmail } from '../services/userServices.js'

export const createUser = expressAsyncHandler(async (req, res, next) => {
    let { email, name, password } = req.body
    const { error, value } = uservalidateObj.validate({ email, name, password })
    if (error) return next(new Error(error.details[0].message))

    const userExists = await findUserByEmail(value.email)
    if (userExists) return next(new Error("user already registered"))

    const hashedPwd = await bcrypt.hash(password, 10)
    const newUser = await client.users.create({
        data: {
            email: value.email,
            name: value.name,
            password: hashedPwd
        }
    })


    if (!newUser.id) return next(new Error("user not created try again later"))
    res.status(201).json({
        status: true,
        user: _.pick(newUser, ['email', 'id', 'name'])
    })
})
