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
	//in case no session is active/no user logged in, it also needs to render the same page, but it should send different data (only 3 users in stead of all)
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
		console.log('\nThe browser will now display the leaderboard.')

let catscore = 0
let dogscore = 0

		db.User.findAll({
			where: {kindOfPerson: 'cat'}
		}).then( (catusers) => {
			// let catscore = 0
			for (var i = 0; i < catusers.length; i++) {
				catscore = catscore + catusers[i].score
			}
			console.log(catscore)
			console.log('..........................')
		}).then ( () => { 
			db.User.findAll({
				where: {kindOfPerson: 'dog'}
			}).then( (dogusers) => {
				// let dogscore = 0
				for (var i = 0; i < dogusers.length; i++) {
					dogscore = dogscore + dogusers[i].score
				}
				console.log(dogscore)
			console.log('--------------------------------')
			}).then ( () => {
				console.log(catscore)
				console.log(dogscore)
				db.User.findAll({
					order: [['score', 'DESC']],
				}).then( (userScores) => { 
					res.render('leaderboard', {
						userRank: userScores, 
						currentUser: user, 
						message: message,
						dogscore: dogscore,
						catscore: catscore
					})
				})
		})
		})
	}
})

module.exports = router
