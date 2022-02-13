const Router = require('express')
const router = new Router()
const visitorChoiceController = require('../controllers/visitorChoiceController')
const checkAdminMiddleware = require("../middleware/checkAdminMiddleware");

router.post('/', visitorChoiceController.create) // создание выбора посетителя
router.get('/', visitorChoiceController.getAll) // получение всего списка выборов
router.get('/:login', checkAdminMiddleware, visitorChoiceController.getOne) // получение фильма конкретного посетителя
//router.delete('/') // удаление фильма

module.exports = router