import { test } from '@japa/runner'
import Supplier from '#models/supplier'

test.group('Chatbox', () => {
  const url: string = '/api/chatbox'

  test('should 200 and return answer to question 1 as signed in user', async ({ client }) => {
    const supplier = await Supplier.first()
    // @ts-ignore
    const response = await client.get(`${url}/1`).withGuard('supplier').loginAs(supplier)

    response.assertStatus(200)
  })

  test('should 200 and return answer to question 1 as signed in user', async ({ client }) => {
    // @ts-ignore
    const response = await client.get(`${url}/1`)

    response.assertStatus(200)
  })
})
