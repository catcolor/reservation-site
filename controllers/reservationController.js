const { User, Restaurant, Reservation } = require('../models')
const reservation = require('../models/reservation')

const reservationController = {
  getReservations: (req, res, next) => {
    return Reservation.findAll({
      raw: true
    })
      .then(() => res.render('reservations'))
      .catch(next)
  },
  createReservation: (req, res, next) => {
    return Reservation.findAll({
      raw: true
    })
      .then(() => res.render('create-reservation'))
      .catch(next)
  },
  addReservation: (req, res, next) => {
    const { restaurantId } = req.params
    const { people, time } = req.body
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      Reservation.findOne({
        where: {
          userId: req.user.id,
          restaurantId
        }
      })
    ])
      .then(([restaurant, reservation]) => {
        if (!restaurant) throw new Error("餐廳不存在 ! ")
        if (reservation) throw new Error("你已預約了 ! ")
        return Reservation.create({
          userId: req.user.id,
          restaurantId,
          people,
          time
        })
      })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}
module.exports = reservationController