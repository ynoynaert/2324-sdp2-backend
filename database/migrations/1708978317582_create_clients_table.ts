import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.string('firstname').nullable();
      table.string('lastname').nullable();
      table.string('email').nullable().unique();
      table.string('phone_number').nullable();
      table.boolean('enabled').nullable();
      
      table.timestamps(true, true);
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}