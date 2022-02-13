const Router = require('express')
const router = new Router()
const movieInformationController = require('../controllers/movieInformationController')
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')

router.post('/', checkAdminMiddleware, movieInformationController.create) // создание фильма
router.get('/', movieInformationController.get) // получение всех фильмов
router.get('/newFilms', movieInformationController.getNew) // получение новых фильмов
router.put('/', checkAdminMiddleware, movieInformationController.refresh) // обновление фильма
router.delete('/', checkAdminMiddleware, movieInformationController.delete) // удаление фильма

module.exports = router