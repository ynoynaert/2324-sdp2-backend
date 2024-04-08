import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class NotificationType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}


const notificationTypes = {
  SIGN_UP: 1,
  ACCOUNT_EDIT: 2,
  NEW_ORDER: 3,
  ORDER_UPDATE: 4,
  NEW_INVOICE: 5,
  PAYMENT_UPDATE: 6,
  PAYMENT_REMINDER: 7,
  ACCOUNT:8
};

export  {notificationTypes};
