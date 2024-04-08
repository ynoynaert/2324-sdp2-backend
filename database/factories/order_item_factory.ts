import factory from '@adonisjs/lucid/factories'
import OrderItem from '#models/order_item'

export const OrderItemFactory = factory
  .define(OrderItem, async ({ faker }) => {
    return {
      order_id: Math.floor(Math.random() * 4) + 1,
      product_id: Math.floor(Math.random() * 4) + 1,
      quantity: Math.floor(Math.random() * 10) + 1,
      unit_of_measure_id: Math.floor(Math.random() * 4) + 1,
      net_amount: faker.finance.amount({ min: 0, max: 1000 }),
      enabled: true,
    }
  })
  .build()