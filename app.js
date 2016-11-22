'use strict'

//use only the ones that are needed

// Import standardized modules
const sequelize = require('sequelize')
const express = require ('express')
const bodyParser = require('body-parser')
const bcrypt = require ('bcrypt-nodejs')
const session = require('express-session');

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
let database = require ( __dirname + '/modules/database')

// require routes
let routestructure = require ( __dirname + '/routes/routestructure')

// use
app.use ( '/', routestructure)


//// For debugging purposes
app.get ('/ping', (req, res) => {
	res.send ('pong')
})

app.listen (8000, ( ) => {
	console.log ('The server is listening on local host 8000')
} )
