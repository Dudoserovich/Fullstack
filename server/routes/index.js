const Router = require('express')
const router = new Router()

const adminRouter = require('./adminRouter')
const visitorRouter = require('./visitorRouter')
const visitorChoiceRouter = require('./visitorChoiceRouter')
const movieInformationRouter = require('./movieInformationRouter')

router.use('/admin', adminRouter)
router.use('/visitor', visitorRouter)
router.use('/movieInformation', movieInformationRouter)
router.use('/visitorChoice', visitorChoiceRouter)

module.exports = router