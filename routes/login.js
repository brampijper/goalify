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
	if(req.session.user) {
		res.redirect('/profile')
	}
	else {
		res.render('index', {
			message: req.query.message
		})
	}
})

router.get('/login', (req, res) => {
	if(req.session.user) {
		res.redirect('/profile')
	}
	else {
		message: req.query.message
		res.render('login')
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
			email: req.body.email
		}
	}).then( (user) => {
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
	})
	}
})

module.exports = router