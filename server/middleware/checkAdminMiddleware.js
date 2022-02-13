const jwt = require("jsonwebtoken");
const {Admin} = require("../models/models");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS")
        next()
    try {
        //console.log('Я тута')
        const token = req.headers.authorization.split(' ')[1] // Bearer dadfsfshkjh
        if (!token) {
            return res.status(401).json({message: "Не авторизированный пользователь"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const loginAdmin = decoded.login
        // проверяем является ли админом
        if (!await Admin.findOne({where: {login: loginAdmin}}))
            return res.status(403).json({message: "Нет доступа"})
        //console.log('Я тута')
        req.admin = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Вы не авторизованы!"})
    }
}