import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'

export const createPaymentMethodValidator = vine.compile(
  vine.object({
    method: vine.string().minLength(1).trim(),
  })
)

export const addPaymentMethodValidator = vine.compile(
  vine.object({
    method: vine.number().exists(exists('payment_methods', 'id')),
  })
)
