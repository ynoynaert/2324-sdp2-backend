import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne } from '@adonisjs/lucid/orm'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import Supplier from './supplier.js'

export default class Account extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Client, { serializeAs: 'client' })
  declare client: HasOne<typeof Client>
  @hasOne(() => Supplier, { serializeAs: 'supplier' })
  declare supplier: HasOne<typeof Supplier>

  @column()
  declare email: string

  @column()
  declare name: string

  @column({ serializeAs: null })
  declare password: string

  @column({ serializeAs: 'admin' })
  declare isAdmin: boolean

  @column()
  declare street: string
  @column()
  declare streetNr: string
  @column()
  declare city: string

  @column()
  declare zipcode: string
  @column()
  declare country: string
  @column()
  declare vatNumber: string

  @column()
  declare imageUrl: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare sector: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
      account.password = await hash.make(account.password)
    }
  }
}
