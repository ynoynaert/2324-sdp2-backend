import Account from '#models/account'
import Client from '#models/client'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'
const url: string = '/api/orders'
test.group('Invoices', () => {
  test('Accessing Invoice URL as guest returns 401', async ({ client }) => {
    ;(await client.get(url)).assertStatus(401)
  })
  test('Accessing Invoice URL as Supplier returns 200', async ({ client }) => {
    const supplier = await Supplier.first()
    const response = await client.get(url).withGuard('supplier').loginAs(supplier!)
    response.assertStatus(200)
  })
  test('Accessing Invoice URL as Admin returns 200', async ({ client }) => {
    const admin = await Account.findBy('email', 'admin@delaware.com')
    const response = await client.get(url).withGuard('admin').loginAs(admin!)
    response.assertStatus(200)
  })
  test('Accessing Invoice URL as client returns 200', async ({ client }) => {
    const clientAcc = await Client.first()
    const response = await client.get(url).withGuard('client').loginAs(clientAcc!)
    response.assertStatus(200)
  })
})
