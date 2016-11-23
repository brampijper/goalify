'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/register', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('register')
	}	
})

//This route checks if all the input fields are filled.
//Makes sure that the user will type in an unique username and emailadress.
router.post('/register', (req, res) => {
	if (req.body.username && req.body.email && req.body.password !== 0) {
		db.User.findOne({
			where: {
				username: req.body.username
			}
		}).then( (user) => {
			if(user) {
				res.redirect('/register?message=' + encodeURIComponent('Sorry, this username is taken'))
				return
			}
			if (!user ) {
				db.User.findOne({
					where: {
						email: req.body.email
					}
				}).then( (user) => {
					if(user) {
						res.redirect('/register?message=' + encodeURIComponent('Sorry, this emailadress is taken'))
						return
					}
					else {
						bcrypt.hash(req.body.password, null, null, function(err, hash) {
							db.User.create({
								username: req.body.username,
								email: req.body.email,
								password: hash,
								score: 0,
								dob: req.body.bday,
								kindOfPerson: req.body.catdog,
								bio: 'This person does not have a bio just yet.'
							}).then(function () {
								db.conn.sync().then( () => {
									console.log('User Added')
									res.redirect('/login?message=' + encodeURIComponent("Please log-in"))
								})
							})
						})				
					}					
				})
			}
		})
	}
	else {
		res.redirect('/register?message=' + encodeURIComponent("Please fill in the form"))
		return
	} 
})

module.exports = router