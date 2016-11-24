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
	kindOfPerson: sequelize.STRING,
	bio: sequelize.STRING
} )
db.Goal = db.conn.define ('goal', {
	title: sequelize.STRING,
	description: sequelize.STRING,
	duration: sequelize.INTEGER,
	difficulty: sequelize.STRING,
	points: sequelize.INTEGER,
	geolocation: sequelize.STRING
})
// var point = { type: 'Point', coordinates: [52.374336, 4.912338]};
db.Complete = db.conn.define ('complete', {
	geolocation: sequelize.STRING
})

//// Define relations
db.User.hasMany( db.Complete )
db.Complete.belongsTo ( db.User )
db.Goal.hasMany( db.Complete)
db.Complete.belongsTo (db.Goal)

db.conn.sync( {force: true}).then( () => {

	//Create sample user 1
	bcrypt.hash('panda123', null, null, function(err, hash) {
		if (err) throw (err); 

		var p1 = db.User.create( {
			username: 'selma2202',
			email: 'selmadorrestein@gmail.com',
			password: hash,
			score: 20,
			dob: '1991-02-22',
			kindOfPerson: 'Cat Person',
			bio: 'I am generally nice'
		})

		//Create sample goal
		var p2 = db.Goal.create( {
			title: 'Run the stairs of Nemo',
			description: 'Start at the bottom, then run as fast as you can up the stairs of Nemo. Take a picture when you are at the top.',
			duration: 5,
			difficulty: 'easy',
			points: 10,
			geolocation: '[52.374336, 4.912338]'
		})

		Promise.all([p1, p2]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				geolocation: '[52.374336, 4.912338]',
				userId: values[0].id,
				goalId: values[1].id
			})
		})
	})

	//Create sample user 2
	bcrypt.hash('a', null, null, function(err, hash) {
		if (err) throw (err); 

		var p3 = db.User.create( {
			username: 'brammieboy',
			email: 'a',
			password: hash,
			score: 30,
			dob: '1992-05-23',
			kindOfPerson: 'Cat Person',
			bio: 'Selma is my BFF in Amsterdam'
		})

		//Create sample goal
		var p4 = db.Goal.create( {
			title: 'Play cards with strangers',
			description: 'Ask a group of strangers to join you for a game of cards.',
			duration: 15,
			difficulty: 'medium',
			points: 30,
			geolocation: '[52.358172, 4.868300]'
		})

		var p5 = db.Goal.create( {
			title: 'Smoke some weed',
			description: 'Go to a coffeeshop and buy some weed',
			duration: 100,
			difficulty: 'hard',
			points: 50,
			geolocation: '[52.372826, 4.895622]'
		})		

		Promise.all([p3, p4]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				geolocation: '[52.358283, 4.864287]',
				userId: values[0].id,
				goalId: values[1].id
			}).then( () => {
				Promise.all([p3, p5]).then(values => {
					db.Complete.create ({
						geolocation: '[52.358283, 4.864287]',
						userId: values[0].id,
						goalId: values[1].id
					})
				})
			})
		})
	})

	//Create sample user 3
	bcrypt.hash('dogs4life', null, null, function(err, hash) {
		if (err) throw (err); 

		var p5 = db.User.create( {
			username: 'jimbo',
			email: 'jimmy@msn.com',
			password: hash,
			score: 30,
			dob: '1993-11-23',
			kindOfPerson: 'Dog Person',
			bio: 'I like marketing and f16'
		})

		//Create sample goal
		var p6 = db.Goal.create( {
			title: 'Take the Ferry',
			description: 'Take the ferry to the opposite of the IJ. Enjoy the wind in your hair and the view over Amsterdam!',
			duration: 30,
			difficulty: 'easy',
			points: 10,
			geolocation: '[52.381627, 4.901176]'
		})

		Promise.all([p5, p6]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				geolocation: '[52.380586, 4.899492]',
				userId: values[0].id,
				goalId: values[1].id
			})
		})
	})


	console.log ('Synced, yay')
})





//export defined module
module.exports = db
