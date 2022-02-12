const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const admin = require('./modules/admin')

const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const commentController = require('../controllers/​​commentController.js')
const reservationController = require('../controllers/reservationController.js')

const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler.js')

router.use('/admin', authenticatedAdmin, admin)

router.delete('/reservations/:id', authenticated, reservationController.removeReservation)
router.post('/reservations/:restaurantId', authenticated, reservationController.addReservation)
router.get('/admin/reservations', authenticatedAdmin, reservationController.getReservations)

router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/users/:id', authenticated, userController.getUser)

router.get('/restaurants/:id', restController.getRestaurant)
router.get('/', (req, res) => {
  res.redirect('/restaurants')
})
router.get('/restaurants', restController.getRestaurants)
router.use('/', generalErrorHandler)

module.exports = router