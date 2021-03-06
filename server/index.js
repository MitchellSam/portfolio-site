const path = require('path')
const express = require('express')
// const db = require('./db')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

const createApp = () => {

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  //   // auth and api routes
  //   app.use('/auth', require('./auth'))
  //   app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

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
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () =>
    console.log(`Server listening on port: ${PORT}`)
  )
}

// const syncDb = () => db.sync()

async function bootApp() {
  // await syncDb()
  await createApp()
  await startListening()
}

bootApp()


