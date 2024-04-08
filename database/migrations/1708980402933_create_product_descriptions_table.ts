import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_descriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('language_id').unsigned().references('id').inTable('languages').onDelete('CASCADE')

      table.string('lister_description', 1000).notNullable()
      table.string('short_description', 500).notNullable()
      table.string('long_description', 10000).notNullable()
      table.boolean('enabled').defaultTo(true)
      table.timestamps(true, true);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
