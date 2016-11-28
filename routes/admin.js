'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )


let db = require(__dirname + '/../modules/database')

router.get('/admin', (req, res) => {
	var user = req.session.user;
	var message = req.query.message;
	if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in."));
	} else {
		console.log (req.session.user)
		res.render('admin', {
			currentUser: user,
			message: message
		})
	}
})

router.post('/admin', (req, res) => {
	db.Goal.create({
		title: req.body.title,
		description: req.body.description,
		duration: req.body.duration,
		difficulty: req.body.difficulty,
		points: req.body.points,
		lat: req.body.lat,
		lng: req.body.lng
	}).then(function () {
		db.conn.sync().then( () => {
			console.log('Goal added')
			res.redirect('/admin?message=' + encodeURIComponent("Do you wish to add another goal?"))
		})

	}) 
})


module.exports = router