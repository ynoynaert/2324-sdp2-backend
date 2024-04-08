import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('method').unique().notNullable()
      table.timestamps(true, true);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}