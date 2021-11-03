const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

///////// SECRET KEY /////////////////
require('dotenv').config()

//render engine
app.engine('html', require('ejs').renderFile) 
module.exports = app

///////// MIDDLEWARE /////////////////
// logging middleware
app.use(morgan('dev'))

// body-parsing middleware
app.use(express.json())

//Enable cross origin
app.use(cors())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

//app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));
app.get('/', (req, res) => res.render(path.join(__dirname, '..', 'public/index.html'), { GOOGLE_KEY: process.env.GOOGLE_KEY }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('logo/', express.static(path.join(__dirname, '..', 'public', 'logo')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'));
// })
app.get('*', (req, res) => res.render(path.join(__dirname, '..', 'public/index.html'), { GOOGLE_KEY: process.env.GOOGLE_KEY }));


// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
