import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare accountId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare vatNumber: string

  @column()
  declare vatType: string

  @column()
  declare billingAddressStreet: string

  @column()
  declare billingAddressZipcode: string

  @column()
  declare billingAddressCountry: string

  @column()
  declare shippingAddressStreet: string

  @column()
  declare shippingAddressZipcode: string

  @column()
  declare shippingAddressCountry: string

  @column()
  declare status: string

  @column()
  declare enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare remark: string

  @column()
  declare paymentPeriod: string
}
