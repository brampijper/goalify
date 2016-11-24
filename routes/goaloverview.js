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
		db.Complete.all({
			where: {
				userId: req.session.user.id
			}
		}).then( (completedGoals) => {
			// console.log(completedGoals[0].goalId)
			db.Goal.all({
				where: {
					id: completedGoals[0,1].goalId
				}
					//goalId !not copmletedGoals.goalId
					//in completedgoals zitten all goals die de user al heeft gedaan
					//Deze moeten geexclude worden van de goals.
					//Hoe dan? 
			}).then( (uncompletedGoals) => {
				console.log(uncompletedGoals)
			})
		})
		res.render('goaloverview')
	}
	else {
		res.redirect('/index')
	}
})

module.exports = router