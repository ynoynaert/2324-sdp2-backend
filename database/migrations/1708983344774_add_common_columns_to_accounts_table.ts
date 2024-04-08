import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      // Create new column with table.<type>(<name>)
      table.string('image_url').nullable()
      table.string('vat_number').nullable().unique()
      table.string('country').nullable()
      table.string('zipcode').nullable()
      table.string('street').nullable()
      table.string('street_nr').nullable()
      table.string('city').nullable()
      table.string('sector').nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('image_url')
      table.dropColumn('vat_number')
      table.dropColumn('country')
      table.dropColumn('zipcode')
      table.dropColumn('street')
      table.dropColumn('sector')
      table.dropColumn('street_nr')
      table.dropColumn('city')
    })
  }
}
