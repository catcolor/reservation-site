const { Comment, User, Restaurant } = require('../models')
const commentController = {
  postComment: (req, res, next) => {
    const { restaurantId, text, score } = req.body
    const userId = req.user.id
    if (!text) throw new Error('請輸入評論 ! ')
    return Promise.all([
      User.findByPk(userId),
      Restaurant.findByPk(restaurantId)
    ])
      .then(([user, restaurant]) => {
        if (!user) throw new Error('使用者不存在 ! ')
        if (!restaurant) throw new Error('餐廳不存在 ! ')
        return Comment.create({
          text,
          restaurantId,
          userId,
          score
        })
      })
      .then(() => {
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(next)
  },
  deleteComment: (req, res, next) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error("評論不存在 ! ")
        return comment.destroy()
      })
      .then(deletedComment => res.redirect(`/restaurants/${deletedComment.restaurantId}`))
      .catch(next)
  }
}
module.exports = commentController