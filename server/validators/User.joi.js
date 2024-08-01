import Joi from 'joi'


const uservalidateObj = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(65).required()
})


export default uservalidateObj
