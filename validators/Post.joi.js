import Joi from "joi";


const postValidObject = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    authorId: Joi.required()
})


export default postValidObject