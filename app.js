const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)