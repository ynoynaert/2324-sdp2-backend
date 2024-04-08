import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('account_id').unsigned().references('id').inTable('accounts').nullable()
      table.string('type').nullable()
      table.string('text').notNullable()
      table.json('data').nullable()
      table.integer('from').unsigned().references('id').inTable('accounts').nullable()
      table.boolean('received').defaultTo(false).notNullable()
      table.boolean('seen').defaultTo(false).notNullable()
      table
        .integer('notification_type_id')
        .unsigned()
        .references('id')
        .inTable('notification_types')
        .notNullable()
      table.timestamps(true, true)
      table.timestamp('deleted_at').nullable()
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['account_id'], 'idx_notifications_account_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['type'], 'idx_notifications_type')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['created_at'], 'idx_notifications_created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
