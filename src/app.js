const express = require('express')
const cors = require('cors')
const dataRouter = require('./routes/dataRoutes.js')

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))

//routes
app.use('/api', dataRouter)

module.exports = { app }