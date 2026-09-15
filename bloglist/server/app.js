const path = require('path')
const fs = require('fs')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV !== 'test') {
  const distPath = path.join(__dirname, '..', 'client', 'dist')
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath))
    app.use((request, response, next) => {
      if (request.method === 'GET' && !request.path.startsWith('/api')) {
        return response.sendFile(path.join(distPath, 'index.html'))
      }
      next()
    })
  }
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app