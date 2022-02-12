const bcrypt = require('bcryptjs')
const { User, Restaurant, Favorite, Reservation } = require('../models')
const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('密碼不一致!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('這個 Email 已經有人註冊了!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }))
      .then(() => {
        res.redirect('/signin')
      })
      .catch(next)
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入 ! ')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功 ! ')
    req.logout()
    res.redirect('/signin')
  },
  addFavorite: (req, res, next) => {
    const { restaurantId } = req.params
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      Favorite.findOne({
        where: {
          userId: req.user.id,
          restaurantId
        }
      })
    ])
      .then(([restaurant, favorite]) => {
        if (!restaurant) throw new Error('餐廳不存在 ! ')
        if (favorite) throw new Error('已加到最愛')
        return Favorite.create({
          userId: req.user.id,
          restaurantId
        })
      })
      .then(() => res.redirect('back'))
      .catch(next)
  },
  removeFavorite: (req, res, next) => {
    return Favorite.findOne({
      where: {
        userId: req.user.id,
        restaurantId: req.params.restaurantId
      }
    })
      .then(favorite => {
        if (!favorite) throw new Error('還沒加到最愛 ! ')
        return favorite.destroy()
      })
      .then(() => res.redirect('back'))
      .catch(next)
  },
  getUser: (req, res, next) => {
    if (req.user.id !== Number(req.params.id)) {
      return res.redirect('back')
    }
    return User.findByPk(req.params.id, {
      include: [
        Reservation,
        { model: Reservation, include: [Restaurant] }
      ]
    })
      .then(user => {
        console.log(user.toJSON())
        return res.render('profile', { user: user.toJSON() })
      })
      .catch(next)
  }
}
module.exports = userController