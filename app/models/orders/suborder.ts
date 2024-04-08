import { DateTime } from 'luxon'
import { BaseModel, afterFind, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import Order from '../order.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderItem from '../order_item.js'
import Supplier from '../supplier.js'
import OrderStatus from './order_status.js'
import PaymentStatus from './payment_status.js'

export default class Suborder extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: 'uuid' })
  declare uuid: string

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @column()
  declare supplierId: number
  @column({ serializeAs: null })
  declare orderId: number
  @column()
  declare orderStatusId: number

  @column()
  declare paymentStatusId: number

  @belongsTo(() => OrderStatus)
  declare orderStatus: BelongsTo<typeof OrderStatus>

  @belongsTo(() => PaymentStatus)
  declare paymentStatus: BelongsTo<typeof PaymentStatus>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterFind()
  static async getFullPrice(suborder: Suborder) {
    let price = 0
    await suborder.load('orderItems')
    const items = suborder.orderItems

    items.forEach((oi) => {
      //@ts-ignore
      const netAmount = parseFloat(oi.netAmount)
      const quantity = oi.quantity
      if (!isNaN(netAmount)) {
        price += netAmount * quantity
      }
    })

    return price
  }
}
