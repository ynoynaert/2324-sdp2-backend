import vine from '@vinejs/vine'
import { unique } from './helpers/db.js'

export const updateAccountValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    email: vine
      .string()
      .email()
      .unique(unique('accounts', 'email', { caseInsensitive: true }))
      .optional(),
    zipcode: vine.string().optional(),
    street: vine.string().optional(),
    streetNr: vine.string().optional(),
    city: vine.string().optional(),
    imageUrl: vine.string().optional(),
    country: vine.string().optional(),
    number: vine.string().optional(),
    sector: vine.string().optional(),
    firstname: vine.string().optional(),
    lastname: vine.string().optional(),
    password: vine.string().optional(),
    phone: vine.string().fixedLength(13).optional(),
  })
)
