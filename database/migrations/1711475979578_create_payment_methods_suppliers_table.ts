import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_methods_suppliers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('supplier_id').unsigned().references('id').inTable('suppliers')
      table.integer('payment_method_id').unsigned().references('id').inTable('payment_methods')
      table.unique(['supplier_id', 'payment_method_id'])
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
