const express = require('express')
const router = express.Router()

const restController = require('../controllers/restController.js')

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})
router.get('/restaurants', restController.getRestaurants)

module.exports = router