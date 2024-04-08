import { test } from '@japa/runner'
import Account from '#models/account'
import Client from '#models/client'
import Order from '#models/order'
import Supplier from '#models/supplier'

test.group('Order', () => {
  const url: string = '/api/orders'

  test('should 200 and get list of  ALL orders as admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const response = await client.get(url).withGuard('admin').loginAs(adminAccount!)
    response.assertStatus(200)
  })

  test("should 200 and get list of ALL client's orders", async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.get(url).withGuard('client').loginAs(clientAccount!)
    response.assertStatus(200)
  })

  test('should 200 and get specific order as admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const order = await Order.first()
    const response = await client
      .get(`${url}/${order!.uuid}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
    response.assertStatus(200)
  })

  test("should 200 and get specific client's order", async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .get(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
    response.assertStatus(200)
  })

  test('should 200 and create order', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat',
      billing_address_street_nr: '14',
      billing_address_zipcode: '9300',
      billing_address_city: 'Aalst',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat',
      shipping_address_street_nr: '14',
      shipping_address_zipcode: '9300',
      shipping_address_city: 'Aalst',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      payment_status_id: 1,
      order_status_id: 1,
    })
    response.assertStatus(204)
  })

  test('should 422 an not create a order for non-existing currency', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 50,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing currency', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing billing_address_street', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing billing_address_zipcode', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing billing_address_country', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing shipping_address_street', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing shipping_address_zipcode', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing shipping_address_country', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing vat_type', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing remark', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      payment_period: '30 days',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing payment_period', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      status: 'open',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a order for missing status', async ({ client }) => {
    const clientAccount = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientAccount!).json({
      currency_id: 1,
      billing_address_street: 'Arbeidstraat 14',
      billing_address_zipcode: '9300',
      billing_address_country: 'Belgium',
      shipping_address_street: 'Arbeidstraat 14',
      shipping_address_zipcode: '9300',
      shipping_address_country: 'Belgium',
      vat_type: 'B2B',
      remark: 'Please deliver before 12:00',
      payment_period: '30 days',
    })
    response.assertStatus(422)
  })

  test('should 200 and update order as admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const order = await Order.first()
    const response = await client
      .patch(`${url}/${order!.uuid}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        payment_status_id: 1,
        order_status_id: 2,
      })
    response.assertStatus(200)
  })

  test('should 200 and update order as client', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client

      .patch(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        payment_status_id: 1,
        order_status_id: 2,
      })
    response.assertStatus(200)
  })

  test('should 200 and update order as supplier', async ({ client }) => {
    const supplierAccount = await Supplier.first()
    const order = await Order.first()
    const response = await client

      .patch(`${url}/${order!.uuid}`)
      .withGuard('supplier')
      .loginAs(supplierAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        payment_status_id: 1,
        order_status_id: 2,
      })
    response.assertStatus(200)
  })

  test('should 404 an not update a order for non-existing currency', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 50,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing currency', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing billing_address_street', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing billing_address_zipcode', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing billing_address_country', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing shipping_address_street', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing shipping_address_zipcode', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing shipping_address_country', async ({
    client,
  }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing vat_type', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        payment_period: '30 days',
        remark: 'Please deliver before 12:00',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing remark', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        payment_period: '30 days',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing payment_period', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        status: 'open',
      })
    response.assertStatus(404)
  })

  test('should 404 and not update a order for missing status', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .put(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
      })
    response.assertStatus(404)
  })

  test('should 404 and delete order as admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const order = await Order.first()
    const response = await client
      .delete(`${url}/${order!.uuid}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
    response.assertStatus(404)
  })

  test('should 404 and delete order as supplier', async ({ client }) => {
    const supplierAccount = await Supplier.first()
    const order = await Order.first()
    const response = await client
      .delete(`${url}/${order!.uuid}`)
      .withGuard('supplier')
      .loginAs(supplierAccount!)
    response.assertStatus(404)
  })

  test('should 404 and delete order as client', async ({ client }) => {
    const clientAccount = await Client.first()
    const order = await Order.first()
    const response = await client
      .delete(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
    response.assertStatus(404)
  })

  test("should 404 and get order that doesn't belong to client", async ({ client }) => {
    const order = await Order.first()
    let clientId = order!.accountId
    const unauthorizedClient = await Client.findOrFail(clientId + 1)

    const response = await client
      .get(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(unauthorizedClient!)

    response.assertStatus(404)
  })

  test('should 200 and client finishes order', async ({ client }) => {
    const order = await Order.first()
    order!.paymentStatusId = 1
    order?.save()

    const clientAccount = await Client.first()
    const response = await client
      .patch(`${url}/${order!.uuid}`)
      .withGuard('client')
      .loginAs(clientAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remark: 'Please deliver before 12:00',
        payment_period: '30 days',
        payment_status_id: 1,
        order_status_id: 2,
      })
    response.assertStatus(200)
  })

  test('should 200 and admin finishes order', async ({ client }) => {
    const order = await Order.first()
    order!.paymentStatusId = 1
    order?.save()

    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const response = await client
      .patch(`${url}/${order!.uuid}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
      .json({
        currency_id: 1,
        billing_address_street: 'Arbeidstraat 14',
        billing_address_zipcode: '9300',
        billing_address_country: 'Belgium',
        shipping_address_street: 'Arbeidstraat 14',
        shipping_address_zipcode: '9300',
        shipping_address_country: 'Belgium',
        vat_type: 'B2B',
        remarks: 'Please deliver before 12:00',
        payment_period: '30 days',
        payment_status_id: 1,
        order_status_id: 2,
      })

    response.assertStatus(200)
  })
})
