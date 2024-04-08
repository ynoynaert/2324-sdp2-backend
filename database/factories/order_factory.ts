import factory from '@adonisjs/lucid/factories'
import Order from '#models/order'

export const OrderFactory = factory
  //@ts-ignore
  .define(Order, async ({ faker }) => {
    return {
      currencyId: Math.floor(Math.random() * 4) + 1,
      billingAddressStreet: faker.location.streetAddress(),
      billingAddressZipcode: faker.location.zipCode(),
      billingAddressCountry: faker.location.countryCode(),
      shippingAddressStreet: faker.location.streetAddress(),
      shippingAddressZipcode: faker.location.zipCode(),
      shippingAddressCountry: faker.location.countryCode(),
      vatType: 'B2B',
      status: Math.floor(Math.random() * 10) + 1 >= 5 ? 'finished' : 'open',
      enabled: true,
      remark: faker.lorem.sentence(),
      paymentPeriod: faker.date.soon(),
    }
  })
  //.relation('orderItems', () => OrderItemFactory)
  .build()
