const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require("../middleware/authAdminMiddleware");

router.post('/login', adminController.login)
router.get('/auth', authMiddleware, adminController.check) // такая же проверка как у visitor

module.exports = router