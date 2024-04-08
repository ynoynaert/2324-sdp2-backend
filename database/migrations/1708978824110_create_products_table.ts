import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.integer('unit_of_measure_id').unsigned()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.boolean('product_availability').notNullable()
      table.text('image_url').nullable()
      table.boolean('enabled').defaultTo(true)
      table.timestamps(true, true)
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['name'], 'idx_products_name')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['category_id'], 'idx_products_category_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['product_availability'], 'idx_products_product_availability')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
