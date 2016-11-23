'use strict'
//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

//The users logs out
router.get('/logout', (req, res) => {
	if(!req.session.email) {
		res.redirect('/login?message=' + encodeURIComponent('Please log-in first;)'))		
	}
	else if(req.session.email) {
		req.session.destroy( (err) => {
			if(err) console.log(err)
			else { 
				res.redirect('/login?message=' + encodeURIComponent('Successfully logged out.'))
			}
		})
	}
})

module.exports = router