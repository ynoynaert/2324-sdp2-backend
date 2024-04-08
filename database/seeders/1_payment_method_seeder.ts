import PaymentMethod from '#models/orders/payment_method'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await PaymentMethod.createMany([
      {
        method: 'Paypal',
      },
      {
        method: 'Bancontact',
      },
      {
        method: 'Wire transfer',
      },
      {
        method: 'VISA',
      },
    ])
  }
}
