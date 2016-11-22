'use strict'

//Import modules
const sequelize = require('sequelize')
const express = require ('express')
const bcrypt = require ('bcrypt-nodejs')

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
	dob: sequelize.DATEONLY,
	kindOfPerson: sequelize.STRING
} )
// var point = { type: 'Point', coordinates: [52.374336, 4.912338]};
db.Goal = db.conn.define ('goal', {
	title: sequelize.STRING,
	description: sequelize.STRING,
	duration: sequelize.INTEGER,
	difficulty: sequelize.STRING,
	points: sequelize.INTEGER,
	// geolocation: sequelize.GEOMETRY('POINT')
})
// var point = { type: 'Point', coordinates: [52.374336, 4.912338]};
db.Complete = db.conn.define ('complete', {
	// geolocation: sequelize.GEOMETRY('POINT')
})

//// Define relations
db.User.hasMany( db.Complete )
db.Complete.belongsTo ( db.User )
db.Goal.hasMany( db.Complete)
db.Complete.belongsTo (db.Goal)

db.conn.sync( {force: true}).then( () => {
	
//Create sample user
bcrypt.hash('panda123', null, null, function(err, hash) {
	if (err) throw (err); 

	db.User.create( {
		username: 'selma2202',
		email: 'selmadorrestein@gmail.com',
		password: hash,
		score: 20,
		dob: '1991-02-22',
		kindOfPerson: 'catperson'
	})
	.then ( user => {
		user.createComplete ( {		
		})
	})
})

//Create sample goal
db.Goal.create( {
	title: 'Run the stairs of Nemo',
	description: 'Start at the bottom, then run as fast as you can up the stairs of Nemo. Take a picture when you are at the top.',
	duration: 5,
	difficulty: 'easy',
	points: 10,
	geolocation: [52.374336, 4.912338]
})
.then ( goal => {
	goal.createComplete ({
	})
})

console.log ('Synced, yay')
})





//export defined module
module.exports = db
