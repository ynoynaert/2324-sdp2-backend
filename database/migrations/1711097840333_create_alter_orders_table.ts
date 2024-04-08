import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('orders', (table) => {
      table
        .integer('payment_status_id')
        .unsigned()
        .references('id')
        .inTable('payment_statuses')
        .notNullable()
        .defaultTo(1)
      table
        .integer('order_status_id')
        .unsigned()
        .references('id')
        .inTable('order_statuses')
        .defaultTo(1)
    })

  this.schema.alterTable('orders', (table) => {
      table.index(['order_status_id'], 'idx_orders_order_status_id')
    })
  }

  async down() {
    this.schema.alterTable('orders', (table) => {
      table.dropForeign('payment_status_id')
      table.dropColumn('payment_status_id')
      table.dropForeign('order_status_id')
      table.dropColumn('order_status_id')
    })
  }
}
