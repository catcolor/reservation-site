const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/adminController')

router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', adminController.postRestaurant)
router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router