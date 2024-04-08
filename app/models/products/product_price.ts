import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class ProductPrice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare productId: number

  @column()
  declare currencyId: number

  @column()
  declare price: number

  @column()
  declare unitOfMeasureId: number

  @column()
  declare quantity: number

  @column()
  declare enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
