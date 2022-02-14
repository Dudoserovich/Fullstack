const ApiError = require('../error/ApiError')

const bcrypt = require('bcrypt')
const {Admin} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (login) => {
    return jwt.sign({login},
        process.env.SECRET_KEY, {expiresIn: '24h'})
}

class AdminController {
    async login(req, res, next) {
        const {login, password} = req.body
        const admin = await Admin.findOne({where: {login}})

        if (!login || !password)
            return next(ApiError.badRequest('Пустой логин или пароль'))
        if (!admin)
            return next(ApiError.badRequest('Вы ещё не зарегистрированы'))
        let comparePassword = bcrypt.compareSync(password, admin.password)
        console.log(await bcrypt.hash(password, 5))
        if (!comparePassword)
            return next(ApiError.badRequest('Указан неверный пароль'))
        const token = generateJWT(admin.login)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.admin.login)
        return res.json({token})
    }

}

module.exports = new AdminController()