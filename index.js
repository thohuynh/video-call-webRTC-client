require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('home')
})

app.listen( port, () => console.log('server start'+ port))