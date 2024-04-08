import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'

export const createProductValidator = vine.compile(
  vine.object({
    unitOfMeasureId: vine.number(),
    categoryId: vine.number().exists(exists('categories', 'id')),
    productAvailability: vine.boolean(),
    name: vine.string(),
  })
)

export const finishOrderValidator = vine.compile(
  vine.object({
    order_status_id: vine.number().positive(),
    payment_status_id: vine.number().positive(),
  })
)
