'use strict'

//// IMPORT STUFF
// Import standardized modules
const xxx = require ('xxx')
//Import possible own modules
let xxx = require (__dirname + '/../modules/xxx')
//for this file
const router = express.Router ( ) 


router.route('/xxx')
.get( (req, res) => {
	xxx
})
.post( (req, res) => {
	xxx
})

////////////////ORRRRR

router.get('/xxx', function (req, res) {
	xxx
});

router.post('/xxx', function (req, res) {
	xxx
})

//// Export
module.exports = router