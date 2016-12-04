// // This didn't work in time trying to animate the bars on the frond page
// // depending on the current cat and dog score in the database

// 'use strict'
// // Import standardized modules
// const sequelize		= require('sequelize')
// const express 		= require ('express')
// const router  		= express.Router ( )

// let db = require(__dirname + '/../modules/database')

// router.get('/index', (req, res) => {
// 	let catScore = 0
// 	let dogScore = 0
// 	db.User.findAll({
// 		where: {
// 			kindOfPerson: 'cat'
// 		}
// 	}).then( (catUsers) => {
// 		for (var i = 0; i < catUsers.length; i++) {
// 			catScore = catScore + catUsers[i].score
// 		}
// 	}).then ( () => {
// 		db.User.findAll({
// 			where: {
// 				kindOfPerson: 'dog'
// 			}
// 		}).then ( (dogUsers) => {
// 			for (var i = 0; i < dogUsers.length; i++) {
// 				dogScore = dogScore + dogUsers[i].score
// 			}
// 		})
// 	}).then ( ( ) => {
// 		console.log(catScore)
// 		console.log(dogScore)
// 		res.render('index', {
// 			catPoints: catScore,
// 			dogPoints: dogScore
// 		})
// 	})
// })

// module.exports = router

