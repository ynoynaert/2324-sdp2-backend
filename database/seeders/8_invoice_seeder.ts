import Invoice from '#models/invoice'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await new Invoice()
      .fill({
        orderId: 1,
        accountId: 1,
        firstName: 'Anke',
        lastName: 'Hazen',
        email: 'account@client.com',
        phoneNumber: '0495/12.34.56',
        vatNumber: 'BE123456',
        vatType: 'B2B',
        billingAddressStreet: 'Arbeidstraat 14',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat 14',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        status: 'finished',
        remark: 'Please deliver before 12:00',
        paymentPeriod: '30 days',
      })
      .save()

    await new Invoice()
      .fill({
        orderId: 2,
        accountId: 1,
        firstName: 'Anke',
        lastName: 'Hazen',
        email: 'account@client.com',
        phoneNumber: '0495/12.34.56',
        vatNumber: 'BE123456',
        vatType: 'B2B',
        billingAddressStreet: 'Arbeidstraat 14',
        billingAddressZipcode: '9300',
        billingAddressCountry: 'Belgium',
        shippingAddressStreet: 'Arbeidstraat 14',
        shippingAddressZipcode: '9300',
        shippingAddressCountry: 'Belgium',
        status: 'open',
        paymentPeriod: '30 days',
      })
      .save()
  }
}
