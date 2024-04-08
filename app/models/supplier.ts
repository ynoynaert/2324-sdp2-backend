import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './products/product.js'
import PaymentMethod from './orders/payment_method.js'

export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  @column()
  declare accountId: number

  @manyToMany(() => PaymentMethod, {
    localKey: 'id',
    pivotForeignKey: 'supplier_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'payment_method_id',
    pivotTable: 'payment_methods_suppliers',
  })
  declare paymentMethods: ManyToMany<typeof PaymentMethod>

  @column()
  declare firstname: string
  @column()
  declare lastname: string

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare enabled: boolean

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
