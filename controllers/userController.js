const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
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
  }
}
module.exports = userController