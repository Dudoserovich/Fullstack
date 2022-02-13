require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')

const router = require('./routes/index')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: "It's working!"})
})

const start = async () => {
    try {
        await sequelize.authenticate(); // подключаемся
        await sequelize.sync(); // проверка состояния со схемой данных
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

start()