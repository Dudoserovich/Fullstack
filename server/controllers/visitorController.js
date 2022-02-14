const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const {Visitor, VisitorChoice} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (login) => {
    return jwt.sign({login},
        process.env.SECRET_KEY, {expiresIn: '24h'})
}

class VisitorController {
    async registration(req, res, next) {
        const {login, password} = req.body
        //console.log(login + ' ' + password)
        if (!login || !password)
            return next(ApiError.badRequest('Пустой логин или пароль'))
        const candidate = await Visitor.findOne({where: {login}})
        // console.log("Я здесь")
        if (candidate)
            return next(ApiError.badRequest('Пользователь с таким логином уже существует!'))
        const hashPassword = await bcrypt.hash(password, 5) // что хэшируем и сколько раз
        console.log("Я здесь" + hashPassword)
        const visitor = await Visitor.create({login, password: hashPassword})
        // console.log("Я здесь")
        const token = generateJWT(visitor.login)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const visitor = await Visitor.findOne({where: {login}})

        if (!login || !password)
            return next(ApiError.badRequest('Пустой логин или пароль'))
        if (!visitor)
            return next(ApiError.badRequest('Вы ещё не зарегистрированы'))
        let comparePassword = bcrypt.compareSync(password, visitor.password)
        if (!comparePassword)
            return next(ApiError.badRequest('Указан неверный пароль'))
        const token = generateJWT(visitor.login)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.visitor.login)
        return res.json({token})
    }
}

module.exports = new VisitorController()