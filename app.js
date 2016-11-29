'use strict'

//use only the ones that are needed

// Import standardized modules
const sequelize = require('sequelize')
const express = require ('express')
const bodyParser = require('body-parser')
const bcrypt = require ('bcrypt-nodejs')
const session = require('express-session');
const pg = require ('pg')

//initialize app
const app = express ( )

app.use(session({
	secret: 'this is a passphrase or something so ladieda',
	resave: false,
	saveUninitialized: false //"usefull with login option"
}));

app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/static"))

app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')

//// routes and modules
// require modules
// let db = require ( __dirname + '/modules/database')

// require routes
let loginRouter			= require (__dirname + '/routes/login')
let logoutRouter		= require (__dirname + '/routes/logout')
let registerRouter		= require (__dirname + '/routes/register')
let profileRouter		= require (__dirname + '/routes/profile')
let goalOverviewRouter	= require (__dirname + '/routes/goaloverview')
let leaderboard			= require (__dirname + '/routes/leaderboard')
let admin				= require (__dirname + '/routes/admin')
let publicprofile		= require (__dirname + '/routes/publicprofile')

// use
app.use ('/', loginRouter)
app.use ('/', logoutRouter)
app.use ('/', registerRouter)
app.use ('/', profileRouter)
app.use ('/', goalOverviewRouter)
app.use ('/', leaderboard)
app.use ('/', admin)
app.use ('/', publicprofile)

//// For debugging purposes
app.get ('/ping', (req, res) => {
	res.send ('pong')
})

app.listen (8000, ( ) => {
	console.log ('The server is listening on local host 8000')
} )
