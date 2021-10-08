const express = require('express')
const dotenv = require('dotenv')

const connectDB = require('./config/database')

const app = express()
const PORT = process.env.PORT || 3000


//  * Load config file
dotenv.config({ path: './config/config.env' })

//  * Database
connectDB()

//  * Middleware
app.use(express.json())

//  * Routes
app.use('/', require('./route/index'))
app.use('/api', require('./route/auth'))





app.listen(PORT, () => console.log(`Server is working on ${PORT}`))