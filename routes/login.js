// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

// let db = require(__dirname + '/database')

router.get('/index', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('index', {
			message: req.query.message
		})
	}
})

router.get('/login', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('login', {
			message: req.query.message
		})
	}
})

router.post('/login', (req, res) => {
	db.user.findOne({
		where: {
			email: req.body.email
		}
	}).then( (user) => {
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(result) {
				req.session.email 		= req.body.email
				req.session.username 	= user.username
				console.log('succesfully logged in')
				res.redirect('/profile')
			} else {
				res.redirect('/login?message=' + encodeURIComponent('Invalid email or password.'))
			}
		})
	})
})

module.exports = router