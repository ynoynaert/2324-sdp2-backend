import { DateTime } from 'luxon'
import { BaseModel, afterFind, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Account from './account.js'
import Suborder from './orders/suborder.js'
import PaymentStatus from './orders/payment_status.js'
import OrderStatus from './orders/order_status.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @hasMany(() => Suborder)
  declare suborders: HasMany<typeof Suborder>

  @column()
  declare currencyId: number

  @column()
  declare billingAddressStreet: string

  @column()
  declare billingAddressZipcode: string

  @column()
  declare billingAddressCountry: string
  @column()
  declare billingAddressStreetNr: string
  @column()
  declare billingAddressCity: string

  @column()
  declare shippingAddressStreet: string

  @column()
  declare shippingAddressZipcode: string

  @column()
  declare shippingAddressCountry: string
  @column()
  declare shippingAddressStreetNr: string
  @column()
  declare shippingAddressCity: string

  @column()
  declare vatType: string

  @column()
  declare orderStatusId: number

  @belongsTo(() => OrderStatus)
  declare orderStatus: BelongsTo<typeof OrderStatus>

  @column()
  declare enabled: boolean

  @column()
  declare paymentStatusId: number

  @belongsTo(() => PaymentStatus)
  declare paymentStatus: BelongsTo<typeof PaymentStatus>

  @column.dateTime()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare remark: string

  @column()
  declare paymentPeriod: string

  @afterFind()
  static async getFullPrice(order: Order) {
    let price = 0
    await order.load('suborders')
    const suborders = order.suborders
    const promises = suborders.map(async (subo) => {
      await subo.load('orderItems')
      const orderItems = subo.orderItems

      orderItems.forEach((oi) => {
        //@ts-ignore
        const netAmount = parseFloat(oi.netAmount)
        if (!isNaN(netAmount)) {
          price += netAmount
        }
      })
    })

    await Promise.all(promises)
    return price
  }
}
