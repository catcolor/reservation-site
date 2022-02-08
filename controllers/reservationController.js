const { Reservation } = require('../models')

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
  }
}
module.exports = reservationController