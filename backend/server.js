const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const server = express()
server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/backend', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    server.listen(
      console.log('Server running on port 27017.')
    )
  })
  .catch((err) => {
    console.error(err)
  })
