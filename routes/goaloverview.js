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

let goalArray = []

router.get('/goaloverview', (req, res) => {
	// db.Goal.findAll().then( goals => console.log('Number of goals ' + goals.length) )
	if(req.session.user) {
		db.Goal.findAll({
			include: [{
				model: db.Complete, 
			 	where: {userId: req.session.user.id},
			 	required: false
			}]
		}).then( (goals) => {
			// res.send(goals)
			for (var i = 0; i < goals.length; i++) {
				// console.log(goals[i].title + ' has ' + goals[i].completes.length + ' completes')

				if(goals[i].completes.length === 0) {
					goalArray.push(goals[i])
				}	
			}
			return goalArray
		}).then( (unfinishedGoals) => {
			fs.writeFile (__dirname + '/../static/json/goals.json', JSON.stringify(unfinishedGoals), 'utf-8', function(error) {
				if(error) throw error
			})	
		}).then( () => {
			res.render('goaloverview')
		})
	}
	else {
		res.redirect('/index')	
	}
})

module.exports = router
