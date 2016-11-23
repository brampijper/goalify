'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/profile', (req, res) => {
	var user = req.session.user;
	var message = req.query.message
	//in case no session is active/no user logged in
	if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in."));
	} else {
		console.log('\nThe browser will now display the profile.')
		res.render('profile', {
			currentUser: user, 
			message: message
		})
	}
})

router.post('/profile', (req, res) => {
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
	}).then( (user) => {
		user.updateAttributes({
			email: req.body.newemail
		})
		res.redirect('/profile?message=' + encodeURIComponent('Your email address has been changed.'))
		return
	})
})


module.exports = router