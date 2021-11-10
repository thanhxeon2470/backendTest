const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(401).json({success: false, message: "Access token not found"})
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({success: false, message: "Token invalid"})
    }
}

module.exports = verifyToken