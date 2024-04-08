import Invoice from '#models/invoice'
import Notification from '#models/notification'
import { notificationTypes } from '#models/notification_type'
import Order from '#models/order'
import Suborder from '#models/orders/suborder'
// import Order from '#models/order'
// import emitter from '@adonisjs/core/services/emitter'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const suborder = await Suborder.first()
    const clientOrder = await Order.query().where('account_id', 2).first()
    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your order has been shipped',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        seen: false,
        notificationTypeId: notificationTypes.ORDER_UPDATE,
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your order is being processed',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.ORDER_UPDATE,
        createdAt: DateTime.fromISO('2022-08-26'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your payment has been received',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.PAYMENT_UPDATE,
        createdAt: DateTime.fromISO('2023-01-26'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your order has been shipped',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        notificationTypeId: notificationTypes.ORDER_UPDATE,
        seen: true,
        createdAt: DateTime.fromISO('2022-01-06'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your order is being processed',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.ORDER_UPDATE,
        createdAt: DateTime.fromISO('2022-01-06'),
      })
      .save()
    const subFromOne = await Suborder.query().where('supplier_id', 1).first()
    await new Notification()
      .fill({
        accountId: 2,
        type: 'supplier',
        text: 'A new order has been placed',
        data: JSON.stringify({ orderId: subFromOne!.uuid }),
        from: 1,
        received: true,
        seen: false,
        notificationTypeId: notificationTypes.NEW_ORDER,
      })
      .save()

    await new Notification()
      .fill({
        accountId: 3,
        type: 'supplier',
        text: 'A new order has been placed',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 1,
        received: true,
        seen: false,
        notificationTypeId: notificationTypes.NEW_ORDER,
      })
      .save()

    await new Notification()
      .fill({
        accountId: null,
        type: 'admin',
        text: 'Freality wishes to sign up',
        data: JSON.stringify({
          client: {
            email: 'tom.hendrickx@people.com',
            lastname: 'Hendrickx',
            password:
              '$scrypt$n=16384,r=8,p=1$Q0NQcMxK/kG3BwHok3PmUg$upVhXVsXKAfYceNs3kSMNUKsYNA+DmpQuwleXqlYWCM2T/iDuKYIfjhpfB2h5fyKjO2EGbXwGo7iMI/0boYolA',
            firstname: 'Tom',
            phoneNumber: '0495/12.34.56',
          },
          account: {
            city: 'Geraardsbergen',
            name: 'Freality',
            sector: 'Retail',
            street: 'Highroad',
            country: 'BE',
            zipcode: '9500',
            imageUrl: 'https://www.freevector.com/uploads/vector/preview/28523/Group-of-People.jpg',
            streetNr: '18',
            vatNumber: 'BE1231244516',
          },
          supplier: {
            email: 'tim.hendrickx@people.com',
            lastname: 'Hendrickx',
            password:
              '$scrypt$n=16384,r=8,p=1$UPGE1BPCohj524wqPlUS6g$xFSOEvmImZQyXcc5tBkhpCVi4unL0fpsOPYdZy8sPt9jQ4kCgDqgefaOc/RF2FB695SdAiReweXblK2VSC84OQ',
            firstname: 'Tim',
            phoneNumber: '0495/12.31.52',
          },
        }),
        from: null,
        received: true,
        seen: false,
        notificationTypeId: notificationTypes.SIGN_UP,
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'admin',
        text: 'Auroratech wants to edit their profile',
        data: JSON.stringify({ street: 'Arbeidstraat', number: '14' }),
        from: 2,
        received: true,
        seen: false,
        notificationTypeId: notificationTypes.ACCOUNT_EDIT,
      })
      .save()

    await new Notification()
      .fill({
        accountId: 3,
        type: 'client',
        text: 'A payment remeinder has been sent',
        data: JSON.stringify({ orderId: clientOrder!.uuid }),
        from: 2,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.PAYMENT_REMINDER,
        createdAt: DateTime.fromISO('2018-07-16'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'supplier',
        text: 'Your payment has been received',
        data: JSON.stringify({ orderId: subFromOne!.uuid }),
        from: 3,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.PAYMENT_UPDATE,
        createdAt: DateTime.fromISO('2018-07-18'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 2,
        type: 'client',
        text: 'Your edit request has been approved',
        data: JSON.stringify({ street: 'Arbeidstraat', number: '14' }),
        from: 1,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.ACCOUNT,
        createdAt: DateTime.fromISO('2020-10-22'),
      })
      .save()

    await new Notification()
      .fill({
        accountId: 3,
        type: 'client',
        text: 'Your edit request has been rejected',
        data: JSON.stringify({ reason: 'Invalid street' }),
        from: 1,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.ACCOUNT,
        createdAt: DateTime.fromISO('2020-10-25'),
      })
      .save()

    const invoice = await Invoice.first()
    await new Notification()
      .fill({
        accountId: 3,
        type: 'client',
        text: 'Your invoice is ready',
        data: JSON.stringify({ invoiceId: invoice!.id }),
        from: 4,
        received: true,
        seen: true,
        notificationTypeId: notificationTypes.NEW_INVOICE,
        createdAt: DateTime.fromISO('2018-07-17'),
      })
      .save()
  }
}
