const jwt = require("jsonwebtoken");
const {VisitorChoice, MovieInformation} = require("../models/models");
const ApiError = require("../error/ApiError");
const {param} = require("express/lib/router");

class VisitorChoiceController {
    async create(req, res, next) {
        const dateVisit = new Date(Date.now()).toISOString()

        //Вытаскиваем idFilm добавляемого фильма
        const {idFilm} = req.body

        // и login посетителя
        const token = req.headers.authorization.split(' ')[1]
        const login = jwt.verify(token, process.env.SECRET_KEY).login

        // проверяем есть ли запись с таким логином и id фильма
        let record = await VisitorChoice.findOne({where: {visitorLogin: login, movieInformationIdMovie: idFilm}})
        //console.log(record.visitorLogin)
        if (!record) {
            const visitorChoice = await VisitorChoice.create(
                {dateVisit: dateVisit, visitorLogin: login,
                    movieInformationIdMovie: idFilm})
            return res.json(visitorChoice)
        } else
            next(ApiError.badRequest(`Запись уже добавлена`))
    }

    // получаем весь список посетителя
    // тут нужно будет пройтись по всем visitorChoice посетителя и вернуть его фильмы
    async getAll(req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        const login = jwt.verify(token, process.env.SECRET_KEY).login

        if (login) {
            const visitorChoice = await VisitorChoice.findAll({where: {visitorLogin: login}})

            // ищем выбранные фильмы посетителя по idFilm
            let films = []
            let film
            for (const item of visitorChoice) {
                film = await MovieInformation.findOne({where: {idMovie: item.dataValues.movieInformationIdMovie}})
                //console.log(film)
                film.dataValues.dateVisit = item.dateVisit
                films.push(film)
                //console.log(item.dataValues.movieInformationIdMovie)
            }

            return res.json(films)

            // return res.json(await VisitorChoice.findAll({where: {visitorLogin: login}}))
        } else
            next(ApiError.badRequest(`Вы не авторизованы`))
    }

    // получение спика админом
    // тут нужно будет пройтись по всем visitorChoice посетителя и вернуть его фильмы
    async getOne(req, res, next) {
        const {login} = req.params
        console.log(login)

        if (login) {
            let visitorChoice = await VisitorChoice.findAll({where: {visitorLogin: login}})

            // ищем выбранные фильмы посетителя по idFilm
            let films = []
            let film
            for (const item of visitorChoice) {
                film = await MovieInformation.findOne({where: {idMovie: item.dataValues.movieInformationIdMovie}})
                films.push(film)
                //console.log(item.dataValues.movieInformationIdMovie)
            }

            //console.log(res.json(films))

            return res.json(films)

            //return res.json(await VisitorChoice.findAll({where: {visitorLogin: login}}))
        } else
            next(ApiError.badRequest(`Дурак, ты зачем свои запросы пишешь, ты же клиент!`))
    }
}

module.exports = new VisitorChoiceController()