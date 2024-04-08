import vine from '@vinejs/vine'
import { unique } from './helpers/db.js'


export const createCategoryValidator = vine.compile(
    vine.object({
        name: vine.string().unique(unique('categories', 'name')),
    })
)