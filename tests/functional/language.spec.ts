import { test } from '@japa/runner'
import Supplier from '#models/supplier'
import Client from '#models/client'
import Account from '#models/account'

test.group('Language', () => {
  const url: string = '/api/languages'

  test('should 200 and return a language', async ({ client }) => {
    const response = await client.get(`${url}/3`)
    response.assertStatus(200)
  })

  test('should 401 and not create a language for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      name: 'Test Language',
    })
    response.assertStatus(401)
  })

  test('should 422 and not create a language with no name', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(adminAccount!).json({})
    response.assertStatus(422)
  })

  test('should 200 and create a language for admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const response = await client.post(url).withGuard('admin').loginAs(adminAccount!).json({
      name: 'Test Language',
    })
    response.assertStatus(200)
  })

  test('should 401 and not update a language for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier).json({
      name: 'Test Language',
    })
    response.assertStatus(401)
  })

  test('should 401 and update a language for client', async ({ client }) => {
    //@ts-ignore
    const response = await client
      .put(`${url}/1`)
      .withGuard('client')
      .loginAs(await Client.first())
      .json({
        name: 'Test Language',
      })
    response.assertStatus(401)
  })

  test('should 200 and update a language for admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(adminAccount!).json({
      name: 'Test Franguage',
    })
    response.assertStatus(200)
  })

  test('should 404 and not update a language with no name', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(adminAccount!).json({})
    response.assertStatus(422)
  })

  test('should 401 and not delete a language for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.delete(`${url}/1`).withGuard('supplier').loginAs(supplier)
    response.assertStatus(401)
  })

  test('should 401 and not delete a language for client', async ({ client }) => {
    //@ts-ignore
    const response = await client
      .delete(`${url}/2`)
      .withGuard('client')
      .loginAs(await Client.first())
    response.assertStatus(401)
  })

  test('should 200 and delete a language for admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.delete(`${url}/3`).withGuard('admin').loginAs(adminAccount!)
    response.assertStatus(200)
  })
})
