import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js'

mongoose
  .connect(
    'mongodb+srv://admin:qwe123@cluster0.rfsxxvy.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.get('/', (req, res) => {
  res.send('hello world 333')
})

//tought our app to understand json
app.use(express.json())

app.post('/auth/login', (req, res) => {
  console.log(req.body)
  res.json({
    success: true,
  })
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})
