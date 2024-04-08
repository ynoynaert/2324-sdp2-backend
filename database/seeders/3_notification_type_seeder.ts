import NotificationType from '#models/notification_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await NotificationType.createMany([
      {
        name: 'Sign up',
      },
      {
        name: 'Account Edit',
      },
      {
        name: 'New Order',
      },
      {
        name: 'Order Update',
      },
      {
        name: 'New Invoice',
      },
      {
        name: 'Payment Update',
      },
      {
        name: 'Payment reminder',
      },
      {
        name: 'Account Update'
      }
    ])
  }
}
