import Account from '#models/account'
import Notification from '#models/notification'
import { notificationTypes } from '#models/notification_type'
import { test } from '@japa/runner'

test.group('Admin dashboard', () => {
  test('Sign up test', async ({ client }) => {
    const response = await client.post('api/auth/sign-up').form({
      name: 'AWOO',
      image_url: 'https://i.pinimg.com/564x/f3/16/66/f31666a63ead6dcefaef107523851ff8.jpg',
      vat_number: 'BE0999999999',
      country: 'BE',
      zipcode: '9300',
      street: 'arbeidstraat',
      sector: 'health',
      supplierEmail: 'admin@delaware.com',
      supplierFirstname: 'suppie firstie',
      supplierLastname: 'suppie lastie',
      supplierPhone: '12345678',
      supplierPassword: 'Password',
      clientEmail: 'client@cli.com',
      clientFirstname: 'cli fi',
      clientLastname: 'cli la',
      clientPassword: 'Password',
      clientPhone: '4567845',
      streetNr: '14',
      city: 'Leopoldsburg',
      paymentMethods: '1,2',
    })

    response.assertStatus(200)
  })

  test('Approve of sign up test', async ({ client }) => {
    const adminNotifs = await Notification.query()
      .where('notification_type_id', notificationTypes.ACCOUNT_EDIT)
      .orderBy('id', 'desc')
      .first()
    const admin = await Account.findBy('email', 'admin@delaware.com')
    //access approve api call and set judgement to true
    const response = await client
      .post('api/dashboard/notifications/' + adminNotifs!.id)
      .form({ judgement: 'approved' })
      .withGuard('admin')
      .loginAs(admin!)

    response.assertStatus(204)
  })
})
