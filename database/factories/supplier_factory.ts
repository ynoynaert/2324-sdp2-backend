import factory from '@adonisjs/lucid/factories'
import Supplier from '#models/supplier'

import { AccountFactory } from './account_factory.js'
import { ProductFactory } from './product_factory.js'

export const SupplierFactory = factory
  .define(Supplier, async ({ faker }) => {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const uuid = Math.floor(Math.random() * (99 - 10 + 1)) + 10 //nr 10 <> 99
    const email = `${firstname + '.' + lastname + uuid + '@' + 'gmail.com'}`

    return {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: faker.phone.number(),
      password: 'Password',
      enabled: true,
    }
  })
  .relation('account', () => AccountFactory)
  .relation('products', () => ProductFactory)
  .build()
