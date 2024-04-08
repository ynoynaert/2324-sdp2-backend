import factory from '@adonisjs/lucid/factories'
import Client from '#models/client'
import { OrderFactory } from './order_factory.js'

export const ClientFactory = factory
  .define(Client, async ({ faker }) => {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const uuid = Math.floor(Math.random() * (99 - 10 + 1)) + 10 //nr 10 <> 99
    const email = `${firstname + '.' + lastname + uuid + '@' + 'gmail.com'}`

    //switch last & firstname => geen auth problemen bij testen zouden er dubbels zijn geweest
    return {
      firstname: lastname,
      lastname: firstname,
      email: email,
      phoneNumber: faker.phone.number(),
      password: 'Password',
      enabled: true,
    }
  })
  .relation('orders', () => OrderFactory)
  .build()
