const { Restaurant, Category } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const restController = {
  getRestaurants: (req, res, next) => {
    const DEFAULT_LIMIT = 9
    const categoryId = Number(req.query.categoryId) || ''
    const keyword = req.query.keyword ? req.query.keyword : ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    return Promise.all([
      Restaurant.findAndCountAll({
        include: Category,
        where: {
          ...categoryId ? { categoryId } : {}
          // [Op.or]: [
          //   { ...categoryId ? { categoryId } : {} },
          //   { name: new RegExp(keyword, 'i') },
          // ]
        },
        limit,
        offset,
        nest: true,
        raw: true
      }),
      Category.findAll({
        raw: true
      })
    ])
      .then(([restaurants, categories]) => {
        const data = restaurants.rows.map(r => ({
          ...r,
          description: r.description.substring(0, 50)
        }))
        return res.render('restaurants', {
          restaurants: data,
          categories,
          categoryId,
          keyword,
          pagination: getPagination(limit, page, restaurants.count)
        })
      })
      .catch(next)
  }
}

module.exports = restController