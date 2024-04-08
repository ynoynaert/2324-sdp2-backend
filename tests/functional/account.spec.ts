import Account from '#models/account'
import Client from '#models/client'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'

test.group('Account', () => {
  const url: string = '/api/me'

  test('should 200 and return clientprofile', async ({ client }) => {
    const accountClient = await Client.first()
    // @ts-ignore
    const response = await client.get(`${url}`).withGuard('client').loginAs(accountClient)

    response.assertStatus(200)
  })

  test('should 200 and return supplierprofile', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.get(`${url}`).withGuard('supplier').loginAs(supplier)

    response.assertStatus(200)
  })

  test('should 200 and return adminprofile', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.get(url).withGuard('admin').loginAs(adminAccount!)

    response.assertStatus(200)
  })

  test('should 401 when not logged in', async ({ client }) => {
    // @ts-ignore
    const response = await client.get(`${url}`)

    response.assertStatus(401)
  })

  test('should 200 and update clientprofile', async ({ client }) => {
    const accountClient = await Client.first()
    // @ts-ignore
    const response = await client.put(url).withGuard('client').loginAs(accountClient).json({
      name: 'Prosthetic legs',
      firstname: 'Patrick',
    })

    response.assertStatus(200)
  })

  test('should 200 and update supplierprofile', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.put(url).withGuard('supplier').loginAs(supplier).json({
      name: 'Prosthetic legs',
      firstname: 'Patrick',
    })

    response.assertStatus(200)
  })

  test('should 403 and not update adminprofile', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    // @ts-ignore
    const response = await client.put(url).withGuard('admin').loginAs(adminAccount!)

    response.assertStatus(403)
  })
})
