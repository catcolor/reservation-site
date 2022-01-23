const express = require('express')
const router = express.Router()

const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const { generalErrorHandler } = require('../middleware/error-handler.js')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})
router.get('/restaurants', restController.getRestaurants)
router.use('/', generalErrorHandler)

module.exports = router