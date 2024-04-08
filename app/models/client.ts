import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,  hasMany } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Order from './order.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @column()
  declare accountId: number

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
