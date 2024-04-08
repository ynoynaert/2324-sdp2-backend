import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('phone_number', 255).notNullable()
      table.string('vat_number').notNullable()
      table.string('vat_type', 255).notNullable()
      table.string('billing_address_street', 255).notNullable()
      table.string('billing_address_zipcode', 255).notNullable()
      table.string('billing_address_country', 255).notNullable()
      table.string('shipping_address_street', 255).notNullable()
      table.string('shipping_address_zipcode', 255).notNullable()
      table.string('shipping_address_Country', 255).notNullable()
      table.string('status', 255).notNullable()
      table.string('remark', 255).nullable()
      table.string('payment_period', 255).notNullable()
      table.timestamps(true, true);
      table.boolean('enabled').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
