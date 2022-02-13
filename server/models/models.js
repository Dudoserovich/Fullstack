const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
    login: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    password: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const Visitor = sequelize.define('visitor', {
    login: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    password: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})

const MovieInformation = sequelize.define('movieInformation', {
    idMovie: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameMovie: {type: DataTypes.STRING, allowNull: false},
    genre: {type: DataTypes.ENUM('Боевик', 'Вестерн', 'Гангстерский фильм', 'Детектив', 'Драма', 'Исторический фильм', 'Комедия', 'Мелодрама', 'Музыкальный фильм', 'Нуар', 'Приключенческий фильм', 'Трагедия', 'Трагигомедия', 'Триллер', 'Фэнтези', 'Фильм ужасов', 'Фильм-катастрофа', 'Криминал', 'Документальный'),
        allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    time: {type: DataTypes.INTEGER, allowNull: false},
    ageLimit: {type: DataTypes.ENUM('6+', '12+', '16+', '18+'), allowNull: false}
}, {
    timestamps: false
})

const VisitorChoice = sequelize.define('visitorChoice', {
    dateVisit: {type: DataTypes.DATE, allowNull: false, primaryKey: true}
}, {
    timestamps: false
})

Visitor.hasMany(VisitorChoice) // [Посетитель] Логин <->> [Выбор] Логин
VisitorChoice.belongsTo(Visitor)

MovieInformation.hasMany(VisitorChoice) // [Фильм] Id фильма <->> [Выбор] Id фильма
VisitorChoice.belongsTo(MovieInformation)

module.exports = {
    Admin,
    Visitor,
    MovieInformation,
    VisitorChoice
}