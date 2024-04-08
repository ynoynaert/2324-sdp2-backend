import Account from '#models/account'
import Client from '#models/client'
import { AccountType } from '#models/helpers/ModelTypes'
import Notification from '#models/notification'
import Order from '#models/order'
import Supplier from '#models/supplier'
import emitter from '@adonisjs/core/services/emitter'

interface NotificationFormat {
  account: Account | Supplier | Client | null
  accountType: AccountType | null
  data?: any
  text: string
  notifType: number
  from: number | null
}

interface AccountFormat {
  account: Account
  supplierEmail: string
  clientEmail: string
}


export type { NotificationFormat, AccountFormat }

declare module '@adonisjs/core/types' {
  interface EventsList {
    'notification:create': NotificationFormat
    'order:finished': Order
  }
}

emitter.on('notification:create', async function (notif: NotificationFormat) {
  const accType = notif?.account as Supplier | Client
  await new Notification()
    .fill({
      accountId: accType?.accountId,
      type: notif.accountType,
      data: notif?.data,
      text: notif.text,
      notificationTypeId: notif.notifType,
      from: notif.from,
    })
    .save()
})

emitter.on('order:finished', async (order: Order) => {
  await order.load('suborders')

  //@ts-expect-error
  const orderItems = order.orderItems 
  const suppliers = new Set<number>()

  if (orderItems != null && orderItems.length > 1) {
    for (const orderItem of orderItems) {
      await orderItem.load('product')
      const product = orderItem.product
      suppliers.add(product.supplierId)
    }
  }
})

