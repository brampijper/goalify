'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const fs 			= require('fs')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

//Make the leaderboard page exist page exist
router.get('/leaderboard', (req, res) => {
	var user = req.session.user;
	var message = req.query.message
	//in case no session is active/no user logged in
	if (user === undefined) {
		db.User.findAll({
			limit: 3,
			order: [['score', 'DESC']],
		}).then( (userScoresLoggedout) => { 
			res.render('leaderboard', {
				userRankLoggedout: userScoresLoggedout, 
				currentUser: user, 
				message: message
			})
		})
		//Otherwise, render the profile page, include data of the current user and include the possibility to show a message
	} else {
		console.log('\nThe browser will now display the profile.')

		db.User.findAll({
			order: [['score', 'DESC']],
		}).then( (userScores) => { 
			res.render('leaderboard', {
				userRank: userScores, 
				currentUser: user, 
				message: message
			})
		})
	}
})

module.exports = router
