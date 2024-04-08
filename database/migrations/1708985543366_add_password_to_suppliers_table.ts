import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'suppliers'

  public async up () {
    this.schema.table(this.tableName, (table) => {
    table.string('password')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('password')
    })
  }
}