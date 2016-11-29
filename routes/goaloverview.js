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
			}
			return goalArray 
		}).then( (unfinishedGoals) => {
			for (var i = 0; i < unfinishedGoals.length; i++) {
				// console.log(unfinishedGoals[i])
			}
			fs.writeFile (__dirname + '/../static/json/goals.json', JSON.stringify(unfinishedGoals), 'utf-8', function(error) {
				if(error) throw error
			})	
		}).then( () => {
			res.render('goaloverview')
		})
	}
})

router.get('/goal-overview', (req, res) => {
	if(req.session.user) {
		db.Goal.findOne({
			where: {
				id: req.query.id
			}
		}).then((goal) => {
			var goalPoints = goal.points
			console.log(goalPoints)
			console.log('------------------------------------------------')
			db.Complete.create({
				lat: goal.lat,
				lng: goal.lng,
				userId: req.session.user.id,
<<<<<<< HEAD
				goalId: goal.id,	
			}).then( () => {
				db.User.findOne({
					where: {
						id: req.session.user.id
					}
				}).then ( (user) => {
					var oldScore = user.score
					console.log(user)
					user.updateAttributes({
						score: oldScore + goalPoints
					})
				})
				res.redirect('goaloverview?message=' + encodeURIComponent("Goal Marked as complete!"))
=======
					
>>>>>>> 7dfee80ebd1362d3cbc1204a2af75dad88cc0697
			})
		})
	}
	else {
		res.redirect('/index')	
	}
})

module.exports = router
