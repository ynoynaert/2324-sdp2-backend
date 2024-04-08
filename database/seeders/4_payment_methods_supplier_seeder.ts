import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await db.table('payment_methods_suppliers').multiInsert([
      {
        supplier_id: 1,
        payment_method_id: 1,
      },
      {
        supplier_id: 1,
        payment_method_id: 2,
      },
      {
        supplier_id: 1,
        payment_method_id: 3,
      },
    ])
  }
}
