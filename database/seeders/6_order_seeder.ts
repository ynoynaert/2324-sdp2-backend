import Order from '#models/order'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { cuid } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
export default class extends BaseSeeder {
  async run() {
    await new Order()
      .fill({
        accountId: 2,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Arbeidstraat',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Aalst',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Aalst',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 1,
        paymentPeriod: '30 days',
        paymentStatusId: 1,
        createdAt: DateTime.fromISO('2022-08-26'),
      })
      .save()

    await new Order()
      .fill({
        accountId: 2,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Arbeidstraat',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Aalst',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Aalst',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 2,
        paymentPeriod: '30 days',
        paymentStatusId: 2,
        createdAt: DateTime.fromISO('2023-01-01'),
      })
      .save()

    await new Order()
      .fill({
        accountId: 2,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Arbeidstraat',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Aalst',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Aalst',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 3,
        remark: 'Please deliver before 12:00',
        paymentPeriod: '30 days',
        paymentStatusId: 1,
        createdAt: DateTime.fromISO('2021-01-01'),
      })
      .save()

    await new Order()
      .fill({
        accountId: 2,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Arbeidstraat ',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat ',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Aalst',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Aalst',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 3,
        paymentPeriod: '30 days',
        paymentStatusId: 2,
        createdAt: DateTime.fromISO('2018-05-05'),
      })
      .save()

    await new Order()
      .fill({
        accountId: 3,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Random Alley Street ',
        billingAddressZipcode: '1700',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Random Alley Street ',
        shippingAddressZipcode: '666',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Citadel',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Citadel',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 1,
        paymentPeriod: '30 days',
        paymentStatusId: 1,
      })
      .save()

    await new Order()
      .fill({
        accountId: 3,
        currencyId: 1,
        uuid: cuid(),
        billingAddressStreet: 'Random Alley Street ',
        billingAddressZipcode: '1700',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Random Alley Street ',
        shippingAddressZipcode: '666',
        shippingAddressCountry: 'Belgium',
        shippingAddressCity: 'Citadel',
        shippingAddressStreetNr: '14',
        billingAddressCity: 'Citadel',
        billingAddressStreetNr: '14',
        vatType: 'B2B',
        orderStatusId: 2,
        paymentPeriod: '30 days',
        paymentStatusId: 1,
      })
      .save()
  }
}
