import Account from '#models/account'
import Supplier from '#models/supplier'
import { test } from '@japa/runner'

const url: string = '/api/auth'

test.group('Login', () => {
  test('invalid login request should 422', async ({ client }) => {
    const response = await client.post(`${url}/login`)
    response.assertStatus(422)
  })
  test('unknown user should 401', async ({ client }) => {
    const response = await client.post(`${url}/login`).json({
      email: 'email@emailistan.com.be.eu',
      password: 'lol!',
    })
    response.assertStatus(401)
  })

  test('known user with valid credentials should 200', async ({ client }) => {
    const account = await Account.findBy('email', 'admin@delaware.com')
    const response = await client.post(`${url}/login`).json({
      email: account!.email,
      password: 'Password',
    })
    response.assertStatus(200)
  })

  test('known user with invalid credentials should 401', async ({ client }) => {
    const supplier = await Supplier.query().first()
   
    const response = await client.post(`${url}/login`).json({
      email: supplier?.email,
      password: 'ribcages',
    })

    response.assertStatus(401)
  })
})
