import Account from '#models/account'
import Client from '#models/client'
import Order from '#models/order'

import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

//TODO: authcheck
export default class OrderPolicy extends BasePolicy {
  async permissionCheck(actionPerformer: Client | Account, order: Order): Promise<boolean> {
    if (actionPerformer instanceof Account) {
      return actionPerformer.isAdmin || actionPerformer.id == order.accountId
    }

    return actionPerformer.accountId == order.accountId
  }

  //@ts-ignore
  create(actionPerformer: Client): AuthorizerResponse {
    return true
  }

  show(actionPerformer: Client, order: Order) {
    return this.permissionCheck(actionPerformer, order)
  }

  //@ts-ignore
  edit(actionPerformer: Client, order: Order): AuthorizerResponse {
    return this.permissionCheck(actionPerformer, order)
  }

  //@ts-ignore
  delete(actionPerformer: Client): AuthorizerResponse {
    return false
  }
}
