import vine from '@vinejs/vine'
import { exists } from './helpers/db.js';

export const createProductDescriptionValidator = vine.compile(
  vine.object({
    languageId: vine.number().positive().exists(exists('languages', 'id')),
    productId: vine.number().positive().exists(exists('products', 'id')),
    listerDescription: vine.string(),
    shortDescription: vine.string(),
    longDescription: vine.string(),
  })
)
