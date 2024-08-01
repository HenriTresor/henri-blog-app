import Joi from "joi";


const commentValidObject = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().required(),
    authorId: Joi.required()
})


export default commentValidObject