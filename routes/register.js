// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

// let db = require(__dirname + '/database')

router.get('/register', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('register')
	}	
})

router.post('/register', (req, res) => {
	if (req.body.username && req.body.email && req.body.password !== 0) {
			bcrypt.hash(req.body.password, null, null, function(err, hash) {
				db.user.create({
					username: req.body.username,
					email: req.body.email,
					password: hash
				}).then(function () {
					db.conn.sync().then(function() {
					console.log('User Added')
					res.redirect('/login?message' + encodeURIComponent("Please log-in"))
					})
				})
			})
	} 
})

module.exports = router