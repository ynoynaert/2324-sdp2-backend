import vine from '@vinejs/vine'
import { unique } from './helpers/db.js'

export const createLanguageValidator = vine.compile(
  vine.object({
    name: vine.string().unique(unique('languages', 'name')),
  })
)
