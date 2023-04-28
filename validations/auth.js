import { body } from 'express-validator'

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
