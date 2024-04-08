import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'

export const createProductPriceValidator = vine.compile(
  vine.object({
    currencyId: vine.number().positive().exists(exists('currencies', 'id')),
    price: vine.number().positive(),
    unitOfMeasureId: vine.number().positive(),
    quantity: vine.number().positive().withoutDecimals(),
  })
)
