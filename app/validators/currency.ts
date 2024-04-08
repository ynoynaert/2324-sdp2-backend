import vine from '@vinejs/vine'
import { unique } from './helpers/db.js'

export const createCurrencyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().unique(unique('currencies', 'name')),
  })
)
