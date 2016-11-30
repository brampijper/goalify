'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const fs 			= require('fs')

//// For router.post /newpic
// use multer as middleware
const multer		= require('multer')
const storage		= multer.diskStorage ({
	//declare where to save the inputted file
	destination: function (req, file, callback) {
		callback(null, './static/images');
	},
	//declare how to name the inputted file (add date.now for uniqueness)
	filename: function (req, file, callback) {
		let newPicture = file.fieldname + '-' + req.session.user.id
		callback(null, newPicture);
	}
})
//
let upload = multer({ storage : storage}).single('newpic');

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
		console.log(req.session.user.id)
		console.log(req.session.user.profifo)

		db.Complete.findAll({
			where: {userId: req.session.user.id},
			order: [['updatedAt', 'DESC']],
			include: [db.Goal]
		}).then( (goals) => { 
			res.render('profile', {
				completedGoals: goals, 
				currentUser: user, 
				profilePic: user.profifo,
				message: message
			})

		})

		
	}
})

//Make seperate forms on the profile page work

//Update profile picture
//used https://codeforgeek.com/2014/11/file-uploads-using-node-js/ as inspiration
router.post('/newpic', (req, res) => {
	//testing what information is in the req
	console.log(req)
	console.log('----------------------------------')

	// this would put the upload in motion
	upload(req, res, function(err) {
		if(err) {
			console.log(err)
			//if an error occurs, get redirected with a message
			return res.redirect('/profile?message=' + encodeURIComponent('Your file could not be uploaded.'));
		} else {
			//Since the username never changes, request users from the database that have the same username as the current user.
			db.User.findOne({
				where: {
					username: req.session.user.username
				}
			})
			.then( (user) => {
				user.updateAttributes({
					profifo: '/images/newpic-' + req.session.user.id  //HOWWWWWWW --> this now translates to "./imagesundefined" in the database
					//since static is the standard go-to for static files (as declared in app.js, by simply saving the path in the database, this should also be able to called upon in the pugfile to show this image)
					//However this doesn't work yet.............
				})
				req.session.user 		= user
				res.redirect('/profile?message=' + encodeURIComponent('Your picture has been changed.'));
			}) 

		}
	});
});


//Old attempt at changing profile picture with base64Img
	// base64Img.base64(__dirname + req.body.newpic, function(err, data) {
	// 	console.log (data)

	// })

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
// })
//at this point, i used https://howtonode.org/really-simple-file-uploads as inspiration
//bram: look into amazon s3
// base64 image node?
// https://www.npmjs.com/package/base64-img

// als je het pad krijgt, kan hij het plaatje eruit halen
// dan plaatje opslaan op bepaalde locatie, met bepaald pad
// dan is het plaatje ookw eer te accessen
// het pad kun je dan in de database zetten
//


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
			bio: req.body.newbio
		})
		//renew session of the same user, but with new bio
		req.session.user 	= user
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
			dob: req.body.newdob
		})
		req.session.user 		= user
		res.redirect('/profile?message=' + encodeURIComponent('Your date of birth has been changed.'))
		return
	})
})
//look into date issue: https://github.com/sequelize/sequelize/issues/4858

//Update email
router.post('/newemail', (req, res) => {
	//In case frontend validation breaks, backend validation to make sure form is not empty
	if (req.body.newemail !== 0) {
		//Check to find out if the new email adress already exists in the database, assigned to a different user
		db.User.findOne({
			where: {
				email: req.body.newemail.toLowerCase()
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
						email: req.body.newemail.toLowerCase(),
					})
					req.session.user 		= user
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
					req.session.user 		= user
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