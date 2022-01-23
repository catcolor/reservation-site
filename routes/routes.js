const express = require('express')
const router = express.Router()

const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})
router.get('/restaurants', restController.getRestaurants)

module.exports = router