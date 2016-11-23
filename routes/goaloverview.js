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
	if(req.session.email) {
		res.render('goaloverview')
	}
	else {
		res.render('index', {
			message: req.query.message
		})
	}
})

module.exports = router