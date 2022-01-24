const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler.js')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})
router.get('/restaurants', restController.getRestaurants)
router.use('/', generalErrorHandler)

module.exports = router