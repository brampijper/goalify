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

//Make the profile page exist
router.get('/profile', (req, res) => {
	var user = req.session.user;
	var message = req.query.message
	//in case no session is active/no user logged in
	if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in."));
		//Otherwise, render the profile page, include data of the current user and include the possibility to show a message
	} else {
		console.log('\nThe browser will now display the profile.')

		db.Complete.findAll({
			where: {userId: req.session.user.id},
			order: [['updatedAt', 'DESC']],
			include: [db.Goal]
		}).then( (goals) => { 
			res.render('profile', {
				completedGoals: goals, 
				currentUser: user, 
				message: message
			})

		})

		
	}
})

//Make seperate forms on the profile page work

//Update profile picture
router.post('/newpic', (req, res) => {
	console.log(req)
	console.log('----------------------------------')
	console.log(req.body.newpic)

	// fs.readFile(req.body.newpic, function (err, data) {
	// 	var newPath = __dirname + "/../static";
	// 	fs.writeFile(newPath, data, function (err) {
	// 		console.log(newPath)
	// 		console.log(data)
	// 		db.User.findOne({
	// 			where: {
	// 				username: req.session.user.username
	// 			}
	// 		}).then( (user) => {
	// 			user.updateAttributes({
	// 				bio: req.body.newpic,
	// 			})

	// 			res.redirect('/profile?message=' + encodeURIComponent('Your picture has been changed.'))
	// 			return
	// 		});
	// 	});



	// })
})
//at this point, i used https://howtonode.org/really-simple-file-uploads as inspiration
//bram: look into amazon s3


//Update bio
router.post('/newbio', (req, res) => {
	//Since the username never changes, request users from the database that have the same username as the current user.
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
		//Since a bio is allowed to be empty, no validation is required.
	}).then( (user) => {
		user.updateAttributes({
			bio: req.body.newbio,
		})
		res.redirect('/profile?message=' + encodeURIComponent('Your bio has been changed.'))
		return
	})
})


//Update date of birth
router.post('/newdob', (req, res) => {
	//Since the username never changes, request users from the database that have the same username as the current user.
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
		//Since a dob has front-end and sequelize validation to be a date format, no further validation is required.
	}).then( (user) => {
		user.updateAttributes({
			dob: req.body.newdob,
		})
		res.redirect('/profile?message=' + encodeURIComponent('Your date of birth has been changed.'))
		return
	})
})

//Update email
router.post('/newemail', (req, res) => {
	//In case frontend validation breaks, backend validation to make sure form is not empty
	if (req.body.newemail !== 0) {
		//Check to find out if the new email adress already exists in the database, assigned to a different user
		db.User.findOne({
			where: {
				email: req.body.newemail
			}
		}).then( (user) => {
			//If it already exists, it can not be changed
			if(user) {
				res.redirect('/profile?message=' + encodeURIComponent('Sorry, this emailadress already exists. Please choose another or login.'))
				return
				//Otherwise: change it!
			} else {
				//Since the username never changes, request users from the database that have the same username as the current user.
				db.User.findOne({
					where: {
						username: req.session.user.username
					}
				}).then( (user) => {
					user.updateAttributes({
						email: req.body.newemail,
					})
					res.redirect('/profile?message=' + encodeURIComponent('Your email has been changed.'))
					return
				})
			}
		})
	}
})

//Update password
router.post('/newpassword', (req, res) => {
	//In case front end validation breaks, make sure new password is at least 8 characters
	if(req.body.newpassword.length <= 7) {
		res.redirect('profile?message=' + encodeURIComponent("Your password should be at least 8 characters long. Please try again."));
		return;
		//Then check whether user didn't make a typo in choosing a new password
	} else if(req.body.newpassword !== req.body.newpassword2) {
		res.redirect('profile?message=' + encodeURIComponent("Your passwords did not match. Please try again."));
		return;
	} else {
		//Since the username never changes, request users from the database that have the same username as the current user.
		db.User.findOne({
			where: {
				username: req.session.user.username
			}
			//Since changing a password is a heavy change, first the old password is required. The old password needs to match the one in the database.
		}).then( (user) => {
			bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
				if(result) {
					//If the user succesfully passed all this validation, a new hashed password will be made.
					bcrypt.hash(req.body.newpassword, null, null, function(err, hash) {
						if (err) throw (err)
							user.updateAttributes({
								password: hash,
							})
					})
					res.redirect('/profile?message=' + encodeURIComponent('Your password has been changed.'))
					return
				} else {
					res.redirect('/profile?message=' + encodeURIComponent('Your old password is incorrect. Please try again.'))
					return
				}
			})
		})
	}
})

//Delete account
router.post('/deleteaccount', (req, res) => {
	//Since the username never changes, request users from the database that have the same username as the current user.
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
	}).then( (user) => {
		//Since deleting an account is a heavy change, first the user must confirm s/he's sure by filling out their password, which will be checked by the database.
		bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
			if(result) {
				//Since the username never changes and is unique, destroy the user from the database that has the same username as the current user.
				db.User.destroy({
					where: {
						username: req.session.user.username
					}
					//Also destroy the current session, otherwise the user will still be send to a profile page, even though it no longer exists.
				}).then( (user) => {
					req.session.destroy( (err) => {
						if(err) console.log(err)
							else { 
								res.redirect('/login?message=' + encodeURIComponent('Your account has been deleted.'))
							}
						})
				})
			} else {
				res.redirect('/profile?message=' + encodeURIComponent('Your old password is incorrect. We can not delete your account.'))
				return
			}
		})
	})
})


module.exports = router