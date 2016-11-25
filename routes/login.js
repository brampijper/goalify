'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/index', (req, res) => {
	var message = req.query.message
	if(req.session.user) {
		res.redirect('/profile')
	}
	else {
		res.render('index', {message: message})
	}
})

router.get('/login', (req, res) => {
	var message = req.query.message
	if(req.session.user) {
		res.redirect('/profile')
	}
	else {
		res.render('login', {message: message})
	}
})

router.post('/login', (req, res) => {
	if(req.body.email === 0) {
		res.redirect('/login?message=' + encodeURIComponent('Please fill in your email.'))
		return
	}

	else if(req.body.password === 0) {
		res.redirect('/login?message=' + encodeURIComponent('Please fill in your password.'))
		return
	}
	
	else {
		db.User.findOne({
			where: {
				email: req.body.email.toLowerCase()
			}
		}).then( (user) => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					if(result) {
						req.session.user 		= user
						// req.session.username 	= user.username
						console.log('succesfully logged in')
						res.redirect('/profile?message=' + encodeURIComponent('Tadaaa logged-in.'))
					} else {
						res.redirect('/login?message=' + encodeURIComponent('Invalid email or password.'))
						return
					}
				})
			} else {
				res.redirect('/login?message=' + encodeURIComponent('Invalid email or password.'))
				return
			}
		})
	}
})

module.exports = router