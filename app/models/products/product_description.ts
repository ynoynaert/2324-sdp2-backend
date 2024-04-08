import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class ProductDescription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare productId: number

  @column()
  declare languageId: number

  @column()
  declare listerDescription: string

  @column()
  declare shortDescription: string

  @column()
  declare longDescription: string

  @column()
  declare enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
