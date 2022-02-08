const { Reservation } = require('../models')

const reservationController = {
  createReservation: (req, res, next) => {
    return Reservation.findAll({
      raw: true
    })
      .then(() => res.render('reservation'))
      .catch(next)
  }
}
module.exports = reservationController