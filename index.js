import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'

import { handleValidationErrors, checkAuth } from './utils/index.js'
import { PostController, UserController } from './controllers/index.js'
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from './validations.js'

mongoose
  .connect(
    'mongodb+srv://admin:qwqwqw@cluster0.rfsxxvy.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.get('/', (req, res) => {
  res.send('hello world 333')
})

//tought our app to understand json
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  PostController.update
)

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})
