import factory from '@adonisjs/lucid/factories'
import Account from '#models/account'
import { SupplierFactory } from './supplier_factory.js'
import { ClientFactory } from './client_factory.js'

// Set to store used email addresses
const usedEmails = new Set()

export const AccountFactory = factory
//@ts-ignore
  .define(Account, async ({ faker }) => {
    let email
    do {
      email = faker.internet.email()
    } while (usedEmails.has(email)) // Ensure uniqueness

    usedEmails.add(email) // Add to used emails set

    return {
      email,
      password: 'Password',
      isAdmin: 0,
      street: faker.location.streetAddress(),
      zipcode: faker.location.zipCode(),
      country: faker.location.countryCode(),
      vatNumber: 'BE784747474747', //TODO: deftig
      imageUrl: faker.image.avatar(),
    }
  })
  .relation('supplier', () => SupplierFactory)
  .relation('client', () => ClientFactory)
  .build()
