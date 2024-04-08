import Suborder from '#models/orders/suborder'
import { cuid } from '@adonisjs/core/helpers'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Suborder.createMany([
      { supplierId: 1, orderId: 1, orderStatusId: 1, paymentStatusId: 1, uuid: cuid() },
      { supplierId: 1, orderId: 2, orderStatusId: 2, paymentStatusId: 2, uuid: cuid() },
      { supplierId: 1, orderId: 3, orderStatusId: 3, paymentStatusId: 1, uuid: cuid() },
      { supplierId: 3, orderId: 5, orderStatusId: 2, paymentStatusId: 1, uuid: cuid() },
      { supplierId: 3, orderId: 6, orderStatusId: 1, paymentStatusId: 2, uuid: cuid() },
      { supplierId: 5, orderId: 1, orderStatusId: 1, paymentStatusId: 2, uuid: cuid() },
      //
      { supplierId: 4, orderId: 4, orderStatusId: 1, paymentStatusId: 2, uuid: cuid() },
      { supplierId: 5, orderId: 4, orderStatusId: 1, paymentStatusId: 2, uuid: cuid() },
    ])
  }
}
