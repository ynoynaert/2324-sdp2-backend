import Client from '#models/client'
import Order from '#models/order'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'

test.group('Payment reminder', () => {
  test('return 200 Supplier sends payment reminder to client', async ({ client }) => {
    // Write your test here
    const order = await Order.query().first()
    await order?.load('suborders')
    const suborder = order?.suborders[0]
    await suborder?.load('supplier')
    const supplier = suborder?.supplier
    const response = await client
      .post('/api/orders/' + suborder!.uuid)
      .withGuard('supplier')
      .loginAs(supplier!)
    response.assertStatus(200)
  })

  test('return 401 Client sends payment reminder to client', async ({ client }) => {
    // Write your test here
    const order = await Order.query().first()
    await order?.load('suborders')
    const suborder = order?.suborders[0]
    const myClient = await Client.first()
    const response = await client
      .post('/api/orders/' + suborder!.uuid)
      .withGuard('client')
      .loginAs(myClient!)
    response.assertStatus(401)
  })
})
