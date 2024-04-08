import OrderItem from '#models/order_item'
import Client from '#models/client'
import Account from '#models/account'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class OrderItemPolicy extends BasePolicy {
  // TODO check of deze async werkt
  async permissionCheck(actionPerformer: Client | Account, orderItem: OrderItem): Promise<boolean> {
    if (actionPerformer instanceof Account) {
      return actionPerformer.isAdmin
    } else {
      await orderItem.load('suborder')
      const suborder = orderItem.suborder
      await suborder.load('order')
      const order = suborder.order
      return order.accountId == actionPerformer.id
    }
  }

  //@ts-ignore
  create(actionPerformer: Client): AuthorizerResponse {
    return true
  }

  show(actionPerformer: Client, orderItem: OrderItem) {
    return this.permissionCheck(actionPerformer, orderItem)
  }

  //@ts-ignore
  edit(actionPerformer: Client, orderItem: OrderItem): AuthorizerResponse {
    return this.permissionCheck(actionPerformer, orderItem)
  }

  //@ts-ignore
  delete(actionPerformer: Client): AuthorizerResponse {
    return false
  }
}
