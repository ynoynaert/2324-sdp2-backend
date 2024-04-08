import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('firstname').nullable(), 
      table.string('lastname').nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('firstname')
      table.dropColumn('lastname')
    })
  }
}
