import OrderStatus from '#models/orders/order_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await OrderStatus.createMany([
      {
        status: 'Open',
      },
      {
        status: 'In Progress',
      },
      {
        status: 'Finished',
      },
    ])
  }
}
