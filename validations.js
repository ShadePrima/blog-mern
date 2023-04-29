import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'bed mail format').isEmail(),
  body('password', 'password must be at least 5 characters').isLength({
    min: 5,
  }),
]

export const registerValidation = [
  body('email', 'bed mail format').isEmail(),
  body('password', 'password must be at least 5 characters').isLength({
    min: 5,
  }),
  body('fullName', 'full name must be at least 3 characters').isLength({
    min: 3,
  }),
  body('avatarUrl', 'bad avatar reference').optional().isURL(),
]

export const postCreateValidation = [
  body('title', 'Enter the article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter the article text').isLength({ min: 10 }).isString(),
  body('tags', 'Invalid tag format. Specify arrey').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
]
