const Router = require('express')
const router = new Router()
const visitorController = require('../controllers/visitorController')
const authMiddleware = require('../middleware/authVisitorMiddleware')

router.post('/registration', visitorController.registration)
router.post('/login', visitorController.login)
router.get('/auth', authMiddleware, visitorController.check) // проверка на авторизованность с помощью токена

module.exports = router