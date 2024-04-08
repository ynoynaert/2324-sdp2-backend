import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uuid').notNullable()
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
      table
        .integer('currency_id')
        .unsigned()
        .references('id')
        .inTable('currencies')
        .onDelete('CASCADE')
      table.string('billing_address_street', 255).notNullable()
      table.string('billing_address_zipcode', 255).notNullable()
      table.string('billing_address_country', 255).notNullable()
      table.string('billing_address_street_nr', 255).notNullable()
      table.string('billing_address_city', 255).notNullable()
      table.string('shipping_address_street', 255).notNullable()
      table.string('shipping_address_zipcode', 255).notNullable()
      table.string('shipping_address_country', 255).notNullable()
      table.string('shipping_address_street_nr', 255).notNullable()
      table.string('shipping_address_city', 255).notNullable()
      table.string('vat_type', 255).notNullable()

      table.string('remark', 255).nullable()
      table.string('payment_period', 255).notNullable()
      table.boolean('enabled').nullable()
      table.timestamps(true, true)
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['created_at'], 'idx_orders_created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
