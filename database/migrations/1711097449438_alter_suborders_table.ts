import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('suborders', (table) => {
      table
        .integer('order_status_id')
        .unsigned()
        .references('id')
        .inTable('order_statuses')
        .defaultTo(1)
        .notNullable()

      table
        .integer('payment_status_id')
        .unsigned()
        .references('id')
        .inTable('payment_statuses')
        .defaultTo(1)
        .notNullable()
    })
  }

  async down() {
    this.schema.alterTable('suborders', (table) => {
      table.dropForeign('order_status_id')
      table.dropColumn('order_status_id')
      table.dropForeign('payment_status_id')
      table.dropColumn('payment_status_id')
    })
  }
}
