const { User, Restaurant, Reservation } = require('../models')
const reservation = require('../models/reservation')

const reservationController = {
  getReservations: (req, res, next) => {
    return Reservation.findAll({
      raw: true,
      nest: true,
      include: [Restaurant]
    })
      .then(reservations => {
        res.render('admin/reservations', { reservations })
      })
      .catch(next)
  },
  addReservation: (req, res, next) => {
    const { restaurantId } = req.params
    const { people, time } = req.body
    if (!people) throw new Error('請填寫人數!')
    if (!time) throw new Error('請填寫預約時間!')
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
        return Reservation.create({
          userId: req.user.id,
          restaurantId,
          people,
          time
        })
      })
      .then(() => res.redirect('back'))
      .catch(next)
  },
  removeReservation: (req, res, next) => {
    return Reservation.findByPk(req.params.id)
      .then(reservation => {
        if (!reservation) throw new Error('你還沒預約 ! ')
        return reservation.destroy()
      })
      .then(() => res.redirect('back'))
      .catch(next)
  }
}
module.exports = reservationController