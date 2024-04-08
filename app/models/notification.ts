import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { AccountType } from './helpers/ModelTypes.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { SIGN_UP, ACCOUNT_EDIT } from '#controllers/admin_dashboard_controller'
import Account from './account.js'
import NotificationType from './notification_type.js'

export default class Notification extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number | null

  @column()
  declare type: AccountType | null

  @column()
  declare text: string

  @column()
  declare data: string | SIGN_UP | ACCOUNT_EDIT //todo is er een JSON type?

  @column()
  declare from: number | null

  @belongsTo(() => Account)
  declare fromAccount: BelongsTo<typeof Account>

  @column()
  declare received: boolean

  @column()
  declare seen: boolean

  @column()
  declare notificationTypeId: number

  @belongsTo(() => NotificationType)
  declare notificationType: BelongsTo<typeof NotificationType>

  @column.dateTime()
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
