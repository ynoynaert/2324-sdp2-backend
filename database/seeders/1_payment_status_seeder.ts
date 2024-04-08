import PaymentStatus from '#models/orders/payment_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await PaymentStatus.createMany([
      {
        status: 'Unpaid',
      },
      {
        status: 'Paid',
      },
    ])
  }
}
