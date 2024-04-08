import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Product from './products/product.js'
import Suborder from './orders/suborder.js'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Suborder)
  declare suborder: HasOne<typeof Suborder>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare suborderId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare unitOfMeasureId: number

  @column()
  declare netAmount: number

  @column()
  declare enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
