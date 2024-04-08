import OrderItem from '#models/order_item'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await new OrderItem()
      .fill({
        suborderId: 1,
        productId: 11,
        quantity: 1,
        unitOfMeasureId: 1,
        netAmount: 99.99,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 1,
        productId: 5,
        quantity: 2,
        unitOfMeasureId: 1,
        netAmount: 599.98,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 2,
        productId: 2,
        quantity: 1,
        unitOfMeasureId: 1,
        netAmount: 199.99,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 2,
        productId: 3,
        quantity: 3,
        unitOfMeasureId: 1,
        netAmount: 29.97,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 10,
        quantity: 5,
        unitOfMeasureId: 1,
        netAmount: 999.95,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 1,
        quantity: 1,
        unitOfMeasureId: 1,
        netAmount: 99.99,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 5,
        quantity: 2,
        unitOfMeasureId: 1,
        netAmount: 599.98,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 2,
        quantity: 1,
        unitOfMeasureId: 1,
        netAmount: 199.99,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 13,
        quantity: 3,
        unitOfMeasureId: 1,
        netAmount: 2999.97,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 3,
        productId: 4,
        quantity: 5,
        unitOfMeasureId: 1,
        netAmount: 149.95,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 4,
        productId: 9,
        quantity: 7,
        unitOfMeasureId: 1,
        netAmount: 179.91,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 5,
        productId: 3,
        quantity: 3,
        unitOfMeasureId: 1,
        netAmount: 899.97,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 5,
        productId: 4,
        quantity: 5,
        unitOfMeasureId: 1,
        netAmount: 149.95,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 5,
        productId: 9,
        quantity: 5,
        unitOfMeasureId: 1,
        netAmount: 149.95,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 6,
        productId: 17,
        quantity: 2,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 6,
        productId: 16,
        quantity: 2,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()

    await new OrderItem()
      .fill({
        suborderId: 7,
        productId: 6,
        quantity: 2,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 7,
        productId: 12,
        quantity: 10,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 7,
        productId: 16,
        quantity: 20,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()
    await new OrderItem()
      .fill({
        suborderId: 8,
        productId: 19,
        quantity: 1,
        unitOfMeasureId: 1,
        netAmount: 1998.0,
      })
      .save()
  }
}
