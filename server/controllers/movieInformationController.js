const {MovieInformation} = require('../models/models')
const ApiError = require('../error/ApiError')

const {Op} = require('sequelize')

// по хорошему нужны проверки на правильность данных,
// но возможно это уже сделаю на фронте

class MovieInformationController {
    async create(req, res, next) {
        const {nameMovie, genre, year, time, ageLimit} = req.body
        let movie = await MovieInformation.findOne({where:{nameMovie, year}})

        if (!movie) {
            const movieInformation = await MovieInformation.create({nameMovie, genre, year, time, ageLimit})
            return res.json(movieInformation)
        } else
            next(ApiError.badRequest(`Фильм ${nameMovie} (${year}) уже добавлен`))
    }

    async get(req, res) {
        const {nameMovie, genre, year} = req.query
        let movies
        // возвращаем все
        if (!nameMovie && !genre && !year) {
            movies = await MovieInformation.findAll()
        }

        // ищем по году
        if (!nameMovie && !genre && year) {
            movies = await MovieInformation.findAll({where:{year}})
        }

        // ищем по жанру
        if (!nameMovie && genre && !year) {
            movies = await MovieInformation.findAll({where:{genre}})
        }

        // ищем по названию
        if (nameMovie && !genre && !year) {
            movies = await MovieInformation.findAll({  where: {
                    nameMovie: {
                        [Op.like]: `%${nameMovie}%`
                    }}})
        }

        // ищем по названию и жанру
        if (nameMovie && genre && !year) {
            movies = await MovieInformation.findAll({where:{ nameMovie: {
                        [Op.like]: `%${nameMovie}%`
                    }, genre}})
        }

        // ищем по названию и году
        if (nameMovie && !genre && year) {
            movies = await MovieInformation.findAll({where:{
                nameMovie: {
                        [Op.like]: `%${nameMovie}%`
                    }, year}})
        }

        // ищем по жанру и году
        if (!nameMovie && genre && year) {
            movies = await MovieInformation.findAll({where:{genre, year}})
        }

        // ищем по всем
        if (nameMovie && genre && year) {
            movies = await MovieInformation.findAll({where:{
                    nameMovie: {
                        [Op.like]: `%${nameMovie}%`
                    }, genre, year}})
        }

        return res.json(movies)
    }

    async getNew(req, res, next) {
        const newFilms = await MovieInformation.findAll({where: {year: (new Date()).getFullYear()}})
        if (newFilms)
            return res.json(newFilms)
        else next(ApiError.badRequest('Список новых фильмов пуст!'))
    }

    async refresh(req, res, next) {
        const {idMovie, nameMovie, genre, year, time, ageLimit} = req.query
        let movie = await MovieInformation.findOne({where:{idMovie}})
        if (!nameMovie && !genre && !year && !time && !ageLimit)
            next(ApiError.badRequest(`Фильм с id:${idMovie} не обновлён. Не заданы обновляемые параметры`))
        else if (movie) {
            movie = await MovieInformation.update(
                { nameMovie: nameMovie,
                    genre: genre,
                    year: year,
                    time: time,
                    ageLimit: ageLimit
                },
                { where: {idMovie} })
            return res.json(movie)
        }
        else
            next(ApiError.badRequest(`Обновляемый фильм не найден`))
    }

    async delete(req, res, next) {
        const {idMovie} = req.query
        let movie = await MovieInformation.findOne({where:{idMovie}})
        if (movie) {
            movie.destroy()
            return res.json(movie)
        } else
            next(ApiError.badRequest(`Удаляемый фильм не найден`))
    }
}

module.exports = new MovieInformationController()