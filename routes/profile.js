// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/profile', (req, res) => {
	if(req.session.email) {
		res.render('profile', {
			userName: req.session.username
		})
	}
	else {
		res.redirect('/login?message' + encodeURIComponent("Please log-in :)"))
	}
})

module.exports = router