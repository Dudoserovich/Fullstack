const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS")
        next()
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer dadfsfshkjh
        if (!token) {
            return res.status(401).json({message: "Вы не авторизованы!"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.visitor = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Вы не авторизованы!"})
    }
}