import express from 'express'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import blogpostRouter from './services/index.js'

const server = express()

const port = process.env.PORT || 3001

server.use(cors())
server.use(express.json())
server.use('/blogpost', blogpostRouter)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on('connected', () => {
  console.log('successfully connected to mongo')
  server.listen(port, () => {
    console.log('server running successfully')
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})
