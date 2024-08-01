import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return next(new Error('token is required'))
        let decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET || 'my-secret-token')
        let { id } = decodedToken
        if (!id) return next(new Error('user id is missing in the token'))
        req.userId = id
        next()
    } catch (error) {
        next(new Error(error.message))
    }
}

export default verifyToken