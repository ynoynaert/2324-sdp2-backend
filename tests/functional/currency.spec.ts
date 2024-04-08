import { test } from '@japa/runner'
import Client from '#models/client'
import Supplier from '#models/supplier'
import Account from '#models/account'

test.group('Currency', () => {
  const url: string = '/api/currencies'

  // index tests
  test('should 200 and return a list of currencies', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.get(url).withGuard('supplier').loginAs(supplier)
    response.assertStatus(200)
  })

  // store tests
  test('should 200 and create a currency for admin', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(account).json({
      name: 'USD',
    })
    response.assertStatus(200)
  })

  test('should 422 and refuse duplication ofcurrency for admin', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(account).json({
      name: 'USD',
    })
    response.assertStatus(422)
  })

  test('should 401 and not create a currency for client', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .post(url)
      .withGuard('client')
      .loginAs(await Client.first())
      .json({
        name: 'USD',
      })
    response.assertStatus(401)
  })

  test('should 401 and not create a currency for supplier', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .post(url)
      .withGuard('supplier')
      .loginAs(await Supplier.first())
      .json({
        name: 'USD',
      })
    response.assertStatus(401)
  })

  test('should 422 and not create a currenct when the "name" field is missing', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(account).json({})

    response.assertStatus(422)
  })

  test('should 422 and not create a currenct when the "name" field is empty', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(account).json({
      name: '',
    })

    response.assertStatus(422)
  })

  test('should 422 and not create a currenct when the "name" field is not a string', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(account).json({
      name: 1,
    })

    response.assertStatus(422)
  })

  // show tests
  test('should 200 and return a currency', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.get(`${url}/1`).withGuard('supplier').loginAs(supplier)

    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
    })
  })

  test('should 404 and not return a currency that does not exist', async ({ client }) => {
    const supplier = await Supplier.first()

    // @ts-ignore
    const response = await client.get(`${url}/100`).withGuard('supplier').loginAs(supplier)

    response.assertStatus(404)
  })

  test('should 404 and not return a currency when the "id" is not a number', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.get(`${url}/a`).withGuard('supplier').loginAs(supplier)

    response.assertStatus(404)
  })

  // update tests
  test('should 200 and update a currency for admin', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(account).json({
      name: 'USD.',
    })

    response.assertStatus(200)
  })

  test('should 401 and not update a currency for client', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .put(`${url}/1`)
      .withGuard('client')
      .loginAs(await Client.first())
      .json({
        name: 'USD',
      })
    response.assertStatus(401)
  })

  test('should 401 and not update a currency for supplier', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .put(`${url}/1`)
      .withGuard('supplier')
      .loginAs(await Supplier.first())
      .json({
        name: 'USD',
      })
    response.assertStatus(401)
  })

  test('should 422 and not update a currency when the "name" field is missing', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(account).json({})

    response.assertStatus(422)
  })

  test('should 422 and not update a currency when the "name" field is empty', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(account).json({
      name: '',
    })

    response.assertStatus(422)
  })

  test('should 422 and not update a currency when the "name" field is not a string', async ({
    client,
  }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(account).json({
      name: 1,
    })

    response.assertStatus(422)
  })

  test('should 404 and not update a currency that does not exist', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/100`).withGuard('admin').loginAs(account).json({
      name: 'USD',
    })

    response.assertStatus(404)
  })

  test('should 404 and not update a currency when the "id" is not a number', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(`${url}/a`).withGuard('admin').loginAs(account).json({
      name: 'USD',
    })

    response.assertStatus(404)
  })

  // delete tests
  test('should 200 and delete a currency for admin', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.delete(`${url}/3`).withGuard('admin').loginAs(account)
    response.assertStatus(200)
  })

  test('should 401 and not delete a currency for client', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .delete(`${url}/2`)
      .withGuard('client')
      .loginAs(await Client.first())

    response.assertStatus(401)
  })

  test('should 401 and not delete a currency for supplier', async ({ client }) => {
    // @ts-ignore
    const response = await client
      .delete(`${url}/2`)
      .withGuard('supplier')
      .loginAs(await Supplier.first())

    response.assertStatus(401)
  })

  test('should 404 and not delete a currency that does not exist', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.delete(`${url}/100`).withGuard('admin').loginAs(account)

    response.assertStatus(404)
  })

  test('should 404 and not delete a currency when the "id" is not a number', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.delete(`${url}/a`).withGuard('admin').loginAs(account)

    response.assertStatus(404)
  })
})
