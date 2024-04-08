import Client from '#models/client'
import Order from '#models/order'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'

test.group('Payment methods', () => {
  const url: string = '/api/supplier'
  test('return 200 add payment method for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    const response = await client
      .post(`${url}/addPaymentMethod`)
      .form({
        method: 4,
      })
      .withGuard('supplier')
      .loginAs(supplier!)
    response.assertStatus(200)
  })

  test('return 200 remove payment method for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    const response = await client
      .delete(`${url}/removePaymentMethod`)
      .form({
        method: 1,
      })
      .withGuard('supplier')
      .loginAs(supplier!)
    response.assertStatus(200)
  })

  test('return 422 add payment method for supplier non-existing method', async ({ client }) => {
    const supplier = await Supplier.first()
    const response = await client
      .post(`${url}/addPaymentMethod`)
      .form({
        method: 99,
      })
      .withGuard('supplier')
      .loginAs(supplier!)
    response.assertStatus(422)
  })

  test('return 401 add payment method for client', async ({ client }) => {
    const clientQ = await Client.first()
    const response = await client
      .post(`${url}/addPaymentMethod`)
      .form({
        method: 99,
      })
      .withGuard('client')
      .loginAs(clientQ!)
    response.assertStatus(401)
  })

  test('return 401 remove payment method for client', async ({ client }) => {
    const clientQ = await Client.first()
    const response = await client
      .delete(`${url}/removePaymentMethod`)
      .form({
        method: 99,
      })
      .withGuard('client')
      .loginAs(clientQ!)
    response.assertStatus(401)
  })
  test('return 200 and pay for order as client', async ({ client }) => {
    const clientQ = await Client.first()
    const order = await Order.first()
    // orders.uuid
    const response = await client
      .post(`/api/orders/${order!.uuid}/pay`)
      .withGuard('client')
      .loginAs(clientQ!)
    response.assertStatus(204)
  })
})
