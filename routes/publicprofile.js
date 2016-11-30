'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')

const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

//dus iedereen die naar deze pagina gestuurd wordt, moet via een link met een id gedaan worden

//Make the profile page exist
router.get('/publicprofile', (req, res) => {
	var message = req.query.message;
	var user = req.session.user;
	var profileId = req.query.id;

if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in to view this user."));
	} else {
		console.log('\nThe browser will now display the profile of a user.')
		db.User.findOne({
			where: {id: profileId},
		}).then(function(userinfo) {
			console.log(userinfo)
			res.render('publicprofile', {
				userinfo: userinfo, currentUser: user, message: message})
		});
	}

	// var user = req.session.user;
	// var message = req.query.message
	// //in case no session is active/no user logged in
	// if (user === undefined) {
	// 	res.redirect('login?message=' + encodeURIComponent("Please log in."));
	// 	//Otherwise, render the profile page, include data of the current user and include the possibility to show a message
	// } else {
	// 	console.log('\nThe browser will now display the profile.')
	// 	console.log(req.session.user.id)
	// 	console.log(req.session.user.profifo)

	// 	db.Complete.findAll({
	// 		where: {userId: req.session.user.id},
	// 		order: [['updatedAt', 'DESC']],
	// 		include: [db.Goal]
	// 	}).then( (goals) => { 
	// 		res.render('profile', {
	// 			completedGoals: goals, 
	// 			currentUser: user, 
	// 			profilePic: user.profifo,
	// 			message: message
	// 		})

	// 	})

		
	// }
})



module.exports = router