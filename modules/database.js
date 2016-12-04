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
	bio: sequelize.STRING,
	profifo: sequelize.STRING
} )
db.Goal = db.conn.define ('goal', {
	title: sequelize.STRING,
	description: sequelize.STRING,
	duration: sequelize.INTEGER,
	difficulty: sequelize.STRING,
	points: sequelize.INTEGER,
	lat: sequelize.STRING,
	lng: sequelize.STRING
})
// var point = { type: 'Point', coordinates: [52.374336, 4.912338]};
db.Complete = db.conn.define ('complete', {
	lat: sequelize.STRING,
	lng: sequelize.STRING
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
			score: 15,
			dob: '1991-02-22',
			kindOfPerson: 'cat',
			bio: 'I am generally nice',
			profifo: ''
		})

		//Create sample goal
		var p2 = db.Goal.create( {
			title: 'Take the elevator at the library',
			description: 'The public library provides a beautiful view from the top. Go there and just look at the Amsterdam Skyline.',
			duration: 15,
			difficulty: 'easy',
			points: 10,
			lat: '52.375847',
			lng: '4.908377'
		})

		Promise.all([p1, p2]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				lat: '52.375847',
				lng: '4.908377',
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
			email: 'brampijper@gmail.com',
			password: hash,
			score: 85,
			dob: '1992-05-23',
			kindOfPerson: 'cat',
			bio: 'Selma is my BFF in Amsterdam',
			profifo: ''
		})

		//Create sample goal
		var p4 = db.Goal.create( {
			title: 'Play cards with strangers',
			description: 'Ask a group of strangers to join you for a game of cards.',
			duration: 15,
			difficulty: 'medium',
			points: 30,
			lat: '52.358172',
			lng: '4.868300'
		})

		var p5 = db.Goal.create( {
			title: 'Smoke some weed',
			description: 'Go to a coffeeshop and buy some weed',
			duration: 100,
			difficulty: 'hard',
			points: 50,
			lat: '52.372826',
			lng: '4.895622'
		})		

		Promise.all([p3, p4]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				lat: '52.358283',
				lng: '4.864287',
				userId: values[0].id,
				goalId: values[1].id
			}).then( () => {
				Promise.all([p3, p5]).then(values => {
					db.Complete.create ({
						lat: '52.358283',
						lng: '4.864287',
						userId: values[0].id,
						goalId: values[1].id
					})
				})
			})
		})
	})

	//Create sample user 3
	bcrypt.hash('admin', null, null, function(err, hash) {
		if (err) throw (err); 

		var p5 = db.User.create( {
			username: 'admin',
			email: 'admin@admin',
			password: hash,
			score: 15,
			dob: '1993-11-23',
			kindOfPerson: 'dog',
			bio: 'I am a mock account for the admin. Try out our admin pages (not visible for the normal user) at /admin, by logging in with email address "admin@admin" and password "admin".',
			profifo: ''
		})

		//Create sample goal
		var p6 = db.Goal.create( {
			title: 'Take the Ferry',
			description: 'Take the ferry to the opposite of the IJ. Enjoy the wind in your hair and the view over Amsterdam!',
			duration: 30,
			difficulty: 'easy',
			points: 10,
			lat: '52.381627',
			lng: '4.901176'
		})

		Promise.all([p5, p6]).then (values => {
			console.log(values[0].id)
			console.log(values[1].id)
			db.Complete.create ({
				lat: '52.380586',
				lng: '4.899492',
				userId: values[0].id,
				goalId: values[1].id
			})
		})
	})


	//Create extra sample goals
	db.Goal.create( {
		title: 'Run the stairs of Nemo',
		description: 'Start at the bottom, then run as fast as you can up the stairs of Nemo. Take a picture when you are at the top.',
		duration: 5,
		difficulty: 'easy',
		points: 10,
		lat: '52.374336',
		lng: '4.912338'
	})

	db.Goal.create( {
		title: 'Go for a swim',
		description: 'A perfect goal for those hot summer days: why don\'t you just jump in the cannel and leave everybody on the quay astonished! Just don\'t forget your towel...',
		duration: 5,
		difficulty: 'easy',
		points: 40,
		lat: '52.374404',
		lng: '4.885953'
	})

	db.Goal.create( {
		title: 'Offer Bram a traineeship',
		description: 'A true perfectionist, great eye for design and easy going to work with: Hiring Bram means a guarantee win of the game!',
		duration: 262974,
		difficulty: 'easy',
		points: 1000000,
		lat: '52.341167',
		lng: '4.822733'
	})

	db.Goal.create( {
		title: 'Offer Selma a traineeship',
		description: 'Accurate, great team member and always eager to learn: Hiring Selma means a guarantee win of the game!',
		duration: 262974,
		difficulty: 'easy',
		points: 1000001,
		lat: '52.341094',
		lng: '4.824170'
	})

	db.Goal.create( {
		title: 'Take a picture with the bobbleheads',
		description: 'If you say Rembrandtparc, you say “two giant dogs”. These dogs, closely resembling your typical bobblehead, always watch over its visitors.',
		duration: 5,
		difficulty: 'easy',
		points: 10,
		lat: '52.364195',
		lng: '4.847546'
	})

	db.Goal.create( {
		title: 'Play an arcade game',
		description: 'The TonTon Club is as close as an arcade hall as Amsterdam has, full of goofy Japanese games, air hockey and mega tetris. Play a game (any game!) and collect your points!',
		duration: 15,
		difficulty: 'medium',
		points: 30,
		lat: '52.386027',
		lng: '4.866168'
	})

	db.Goal.create( {
		title: 'Go to the other B. building',
		description: 'Creativity can simply not be held in one place... so go check out the other B. building, while going for a nice walk!',
		duration: 15,
		difficulty: 'easy',
		points: 10,
		lat: '52.342633',
		lng: '4.827949'
	})

	db.Goal.create( {
		title: 'Do Parcours',
		description: 'In this nice area, locked-off yards and parcs run between the streets. Jump the fence, run across the yard, and jump the fence again: you\'re now doing parcours!',
		duration: 15,
		difficulty: 'medium',
		points: 20,
		lat: '52.339351',
		lng: '4.894810'
	})

	db.Goal.create( {
		title: 'Go to the beach',
		description: 'The beach? Yes, Amsterdam has multiple little city beaches! One of the lesser known ones is at the Sloterplas. Discover it yourself and go for a swim!',
		duration: 10,
		difficulty: 'medium',
		points: 40,
		lat: '52.371653',
		lng: '4.822276'
	})

	db.Goal.create( {
		title: 'Register',
		description: 'Right here, right in the middle of Amsterdam, is where you collected your first 5 points and it\'s where your journey begins. Let\'s Explorify!',
		duration: 1,
		difficulty: 'easy',
		points: 5,
		lat: '52.367438',
		lng: '4.895367'
	})


	console.log ('Synced, yay')
})





//export defined module
module.exports = db
