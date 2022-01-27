const { Restaurant, Category } = require('../models')
const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants =>
        res.render('admin/restaurants', { restaurants })
      )
      .catch(next)
  },
  createRestaurant: (req, res, next) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => res.render('admin/create-restaurant', { categories }))
      .catch(next)
  },
  postRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('餐廳名稱必填 ! ')
    Restaurant.create({
      name,
      tel,
      address,
      openingHours,
      description,
      categoryId
    })
      .then(() => {
        req.flash('success_messages', '餐廳成功編輯!')
        res.redirect('admin/restaurants')
      })
      .catch(next)
  },
  getRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('餐廳不存在 !')
        res.render('admin/restaurant', { restaurant })
      })
      .catch(next)
  },
  editRestaurant: (req, res, next) => {
    Promise.all([
      Restaurant.findByPk(req.params.id, {
        raw: true
      }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurant, categories]) => {
        if (!restaurant) throw new Error('餐廳不存在 !')
        res.render('admin/edit-restaurant', { restaurant, categories })
      })
      .catch(next)
  },
  putRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('餐廳名稱必填 !')
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error('餐廳不存在 !')
        return restaurant.update({
          name,
          tel,
          address,
          openingHours,
          description,
          categoryId
        })
      })
      .then(() => {
        req.flash('success_messages', '餐廳已成功編輯')
        res.redirect('/admin/restaurants')
      })
      .catch(next)
  },
  deleteRestaurant: (req, res, next) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error('餐廳不存在 !')
        return restaurant.destroy()
      })
      .then(() => res.redirect('/admin/restaurants'))
      .catch(next)
  }
}

module.exports = adminController