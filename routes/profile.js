'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

router.get('/profile', (req, res) => {
	var user = req.session.user;
	var message = req.query.message
	//in case no session is active/no user logged in
	if (user === undefined) {
		res.redirect('login?message=' + encodeURIComponent("Please log in."));
	} else {
		console.log('\nThe browser will now display the profile.')
		res.render('profile', {
			currentUser: user, 
			message: message
		})
	}
})

// router.post('/profile', (req, res) => {
// 	db.User.findOne({
// 		where: {
// 			username: req.session.user.username
// 		}
// 	}).then( (user) => {
// 		user.updateAttributes({
// 			email: req.body.newemail,
// 			bio: req.body.newbio,
// 			dob: req.body.newdob,
// 			password: req.body.newpassword
// 		})
// 		res.redirect('/profile?message=' + encodeURIComponent('Your personal details has been changed.'))
// 		return
// 	})
// })

router.post('/newbio', (req, res) => {
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
	}).then( (user) => {
		user.updateAttributes({
			bio: req.body.newbio,
		})
		res.redirect('/profile?message=' + encodeURIComponent('Your bio has been changed.'))
		return
	})
})

router.post('/newdob', (req, res) => {
	db.User.findOne({
		where: {
			username: req.session.user.username
		}
	}).then( (user) => {
		user.updateAttributes({
			dob: req.body.newdob,
		})
		res.redirect('/profile?message=' + encodeURIComponent('Your date of birth has been changed.'))
		return
	})
})

router.post('/newemail', (req, res) => {
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
})

router.post('/newpassword', (req, res) => {
	if(req.body.newpassword.length <= 7) {
		res.redirect('profile?message=' + encodeURIComponent("Your password should be at least 8 characters long. Please try again."));
		return;
	} else if(req.body.newpassword !== req.body.newpassword2) {
		res.redirect('profile?message=' + encodeURIComponent("Your passwords did not match. Please try again."));
		return;
	} else {
		db.User.findOne({
			where: {
				username: req.session.user.username
			}
		}).then( (user) => {
			bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
				if(result) {
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




// Validate email
// Validate password
// check whether new passwords match
// hash new password

// to destroy account: http://stackoverflow.com/questions/8402597/sequelize-js-delete-query
// where id = req.session.user.id

module.exports = router