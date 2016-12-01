'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )


let db = require(__dirname + '/../modules/database')

router.get('/admin-editgoal', (req, res) => {
	var user = req.session.user;
	// var id = req.query.id;
	if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in."));
	} else {
		db.Goal.findOne({
			where: {id: req.query.id}
		}).then( (goal) => {
			console.log (goal)
			res.render('admin-editgoal', {
				currentUser: user,
				currentGoal: goal
				// goals: goals
			})

		})
	}
})

router.post('/admin-editgoal', (req, res) => {
	db.Goal.findOne({
		where: {
			id: req.query.id
		}
	}).then( (goal) => {
		if ( req.body.newtitle.length !== 0 ) {
			goal.updateAttributes({
				title: req.body.newtitle
			})
		} else {
			goal.updateAttributes({
				title: goal.title
			})
		}
	}).then ((goal) => {
		console.log('---------------------------')
		console.log(goal)//undefined??
		if ( req.body.newdescription.length !== 0 ) {
			goal.updateAttributes({
				description: req.body.newdescription
			})
		} else {
			goal.updateAttributes({
				description: goal.description
			})
		}
	}).then (() => {
		res.redirect('/admin?message=' + encodeURIComponent('The goal has been changed.'));

	})
})




		// .then (( goal ) => {
		// 	if ( req.body.newdescription.length !== 0 ) {
		// 		goal.updateAttributes({
		// 			description: req.body.newdescription
		// 		}).then (() => {
		// 			res.redirect('/admin?message=' + encodeURIComponent('The goal has been changed.'));
		// 		})
		// 	}
		// })

		// werkt nog even niet: werken met .then .then .then etc, of misschien met promises?
		// bijv: if newtitle.length !== 0 ==> update, en anders hou het op goal.title.
		//en dan dat allemaal aanmaken aan variablen en daarmee een promise vullen
		// if ( req.body.newdescription.length !== 0 ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newdescription
		// 	})
		// }
		// if ( req.body.newduration.length !== 0 ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newduration
		// 	})
		// }
		// if ( req.body.newdifficulty !== 'easy' || req.body.newdifficulty !== 'medium' || req.body.newdifficulty !== 'hard' ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newdifficulty
		// 	})
		// }
		// if ( req.body.newpoints.length !== 0 ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newpoints
		// 	})
		// }
		// if ( req.body.newlat.length !== 0 ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newlat
		// 	})
		// }
		// if ( req.body.newlng.length !== 0 ) {
		// 	goal.updateAttributes({
		// 		title: req.body.newlng
		// 	})
		// }
		// res.redirect('/admin?message=' + encodeURIComponent('The goal has been changed.'));
	// })


	// db.Goal.create({
	// 	title: req.body.title,
	// 	description: req.body.description,
	// 	duration: req.body.duration,
	// 	difficulty: req.body.difficulty,
	// 	points: req.body.points,
	// 	lat: req.body.lat,
	// 	lng: req.body.lng
	// }).then(function () {
	// 	db.conn.sync().then( () => {
	// 		console.log('Goal added')
	// 		res.redirect('/admin?message=' + encodeURIComponent("Do you wish to add another goal?"))
	// 	})

	// }) 
// })
// iets met if xxx.length !== 0 (dus dan heb je maar één knop nodig voor alles.)

// router.post('/deletegoal', (req, res) => {
// 	// let deleteId = req.query.id
// 	db.Goal.destroy({
// 		where: {
// 			id: req.query.id
// 		}
// 	}).then(function () {
// 		console.log('Goal deleted')
// 		res.redirect('/admin?message=' + encodeURIComponent("The goal has been deleted."))
// 	})	 
// })


module.exports = router