import factory from '@adonisjs/lucid/factories'
import Currency from '#models/currency'

export const CurrencyFactory = factory
  .define(Currency, async ({ faker }) => {
    return {
      name: faker.finance.currency().name,
    }
  })
  .build()
