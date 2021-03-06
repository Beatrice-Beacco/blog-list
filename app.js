const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//Import my modules
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


//Connect to Mongoose
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

logger.info('connecting to', config.MONGODB_URI)

//Use middleware
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


