import Account from '#models/account'
import Client from '#models/client'
import Notification from '#models/notification'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'

test.group('Notifications', () => {
  const url = '/api/me/notifications'
  test('return 401 when notifs as not-logged person', async ({ client }) => {
    const response = await client.get(url)
    response.assertStatus(401)
  })

  test('return 200 when notifs as client  ', async ({ client }) => {
    const clientQ = await Client.first()
    const response = await client.get(url).withGuard('client').loginAs(clientQ!)
    response.assertStatus(200)
  })

  test('return 200 when notifs as supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    const response = await client.get(url).withGuard('supplier').loginAs(supplier!)
    response.assertStatus(200)
  })

  test('return 200 when notifs as admin', async ({ client }) => {
    const admin = await Account.findBy('email', 'admin@delaware.com')
    const response = await client.get(url).withGuard('admin').loginAs(admin!)
    response.assertStatus(200)
  })

  test('return 200 and get specific notif as client', async ({ client }) => {
    const clientQ = await Client.first()
    const notif = await Notification.first()
    const response = await client.get(`${url}/${notif!.id}`).withGuard('client').loginAs(clientQ!)
    response.assertStatus(200)
  })

  test('return 200 and get specific notif as supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    const notif = await Notification.first()
    const response = await client.get(`${url}/${notif!.id}`).withGuard('supplier').loginAs(supplier!)
    response.assertStatus(200)
  })

  test('return 200 and get specific notif as admin', async ({ client }) => {
    const admin = await Account.findBy('email', 'admin@delaware.com')
    const notif = await Notification.first()
    const response = await client.get(`${url}/${notif!.id}`).withGuard('admin').loginAs(admin!)
    response.assertStatus(200)
  })
})
