import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_prices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('currency_id').unsigned().references('id').inTable('currencies').onDelete('CASCADE')
      table.decimal('price', 10, 2).notNullable()
      table.integer('unit_of_measure_id').unsigned()
      table.integer('quantity').unsigned()
      table.boolean('enabled').defaultTo(true)
      table.timestamps(true, true);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}