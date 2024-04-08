import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from '../category.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Supplier from '../supplier.js'
import ProductPrice from './product_price.js'
import ProductDescription from './product_description.js'
import OrderItem from '../order_item.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare supplierId: number

  @column()
  declare accountId: number

  @belongsTo(() => Product)
  declare account: BelongsTo<typeof Product>
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
  @hasMany(() => ProductDescription)
  declare productDescription: HasMany<typeof ProductDescription>

  @hasMany(() => ProductPrice)
  declare productPrice: HasMany<typeof ProductPrice>

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @column()
  declare unitOfMeasureId: number

  @column()
  declare categoryId: number

  @column()
  declare productAvailability: boolean

  @column()
  declare imageUrl: string

  @column()
  declare enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
