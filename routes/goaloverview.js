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
var completedGoalArray = []

router.get('/goaloverview', (req, res) => {
	// db.Goal.findAll().then( goals => console.log('Number of goals ' + goals.length) )
	let user = req.session.user
	let message = req.query.message

	if (user === undefined) {

		res.redirect('login?message=' + encodeURIComponent("Please log in."))
	}

	else {
		db.Goal.findAll({
			include: [{
				model: db.Complete, 
				where: {userId: req.session.user.id},
				required: false
			}]
		}).then( (goals) => {
			var goalArray = []
			for (var i = 0; i < goals.length; i++) {
				//console.log(goals[i].title + ' has ' + goals[i].completes.length + ' completes')
				if(goals[i].completes.length === 0) {
					goalArray.push(goals[i])
				}
				else {
					completedGoalArray.push(goals[i])
				}
			}
			return goalArray	 
		}).then( (unfinishedGoals) => {
			fs.writeFile (__dirname + '/../static/json/goals.json', JSON.stringify(unfinishedGoals), 'utf-8', function(error) {
				if(error) throw error
			})
			fs.writeFile (__dirname + '/../static/json/finishedGoals.json', JSON.stringify(completedGoalArray), 'utf-8', function(error) {
				if(error) throw error
			})
		}).then( () => {
			res.render('goaloverview')
		})
	}
})

router.get('/goal-overview', (req, res) => {
	if(req.session.user) {
		console.log(req.query)
		console.log('--------------------------------------------------------------------')
		db.Goal.findOne({
			where: {
				id: req.query.id
			}
		}).then((goal) => {
			var goalPoints = goal.points
			db.Complete.create({
				lat: goal.lat,
				lng: goal.lng,
				userId: req.session.user.id,
				goalId: goal.id	
			}).then( () => {
				db.User.findOne({
					where: {
						id: req.session.user.id
					}
				}).then ( (user) => {
					var oldScore = user.score
					user.updateAttributes({
						score: oldScore + goalPoints
					})
				})
				res.redirect('goaloverview?message=' + encodeURIComponent("Goal Marked as complete!"))
			})
		})
	}
	else {
		res.redirect('/index')	
	}
})

module.exports = router
