'use strict'

//Import modules
const sequelize = require('sequelize')
const express = require ('express')

//define module

const db = {}
// Connect to database
db.conn = new sequelize ('goalify', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

// Define database structure

//// Define models
db.User = db.conn.define( 'user', {
	username: sequelize.STRING,
	email: { type: sequelize.STRING, unique: true },
	password: sequelize.STRING,
	score: sequelize.INTEGER,
	age: sequelize.INTEGER,
	kindOfPerson: sequelize.STRING
} )
db.Goal = db.conn.define ('goal', {
	title: sequelize.STRING,
	description: sequelize.STRING,
	duration: sequelize.INTEGER,
	difficulty: sequelize.STRING,
	points: sequelize.INTEGER,
	geolocation: sequelize.GEOMETRY(point)
})
db.Complete = db.conn.define ('complete', {
	geolocation: sequelize.GEOMETRY(point)
})

//// Define relations
db.User.hasMany( db.Complete )
db.Complete.belongsTo ( db.User )
db.Goal.hasMany( db.Complete)
db.Complete.belongsTo (db.Goal)

db.conn.sync( {force: false}).then( () => {
	console.log ('Synced, yay')
})




//export defined module
module.exports = db
