'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/goaloverview', (req, res) => {
	if(req.session.user) {
		db.Goal.all({
			include: [{
				model: db.Complete, 
			 	where: {userId: req.session.user.id} //userId == req.sessions.user.id
			 										 //db.Complete.goalId == db.Goal.goalId
			}]
		}).then( (allGoals) => {
			db.Goal.all({
				where: {
				}
			})
			console.log(completedGoals)
			// db.Goal.all({


			// }).then( (result) => {
			// 	console.log(result)
			// })

			

			// console.log(completedGoals[0].goalId)
				// where: {
				// 	$ne: completedGoals[0].goalId,
				// 	$ne: completedGoals[1].goalId
				// }
				// 	//goalId !not copmletedGoals.goalId
					//in completedgoals zitten all goals die de user al heeft gedaan
					//Deze moeten geexclude worden van de goals.
			})
				// console.log(completedGoals)
		res.render('goaloverview')
	}
	else {
		res.redirect('/index')
	}
})

module.exports = router

//include the completed goals model
//or the other way around. 

// where: {
// 	userId: req.session.user.id
// }