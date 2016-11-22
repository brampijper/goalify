'use strict'

const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

//connecting string to the database.
let db = new sequelize ('goalify', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Define the database structure
let User = db.define('user', {
	username: 	sequelize.STRING,
	email: 		sequelize.STRING,
	password: 	sequelize.STRING 
})

let Message = db.define('message', {
	note: 		sequelize.STRING
})

let Comment = db.define('comment', {
	opinion: 	sequelize.STRING
})

//Define relations
User.hasMany(Message)
User.hasMany(Comment)
Message.hasMany(Comment)
Message.belongsTo(User)
Comment.belongsTo(User)
Comment.belongsTo(Message)

module.exports = {
	conn: db,
	user: User,
	message: Message,
	comment: Comment
}