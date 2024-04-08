import Account from '#models/account'
import Suborder from '#models/orders/suborder'
import Supplier from '#models/supplier'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class SuborderPolicy extends BasePolicy {
  async permissionCheck(actionPerformer: Supplier | Account, suborder: Suborder): Promise<boolean> {
    if (actionPerformer instanceof Account) {
      return actionPerformer.isAdmin
    } else if (actionPerformer instanceof Supplier) {
      return suborder.supplierId == actionPerformer.id
    }

    return false
  }

  //@ts-ignore
  create(actionPerformer: Supplier): AuthorizerResponse {
    return false // tldr; supplier doesnt make the suborder, the client does
  }

  show(actionPerformer: Supplier, suborder: Suborder) {
    return this.permissionCheck(actionPerformer, suborder)
  }

  //@ts-ignore
  edit(actionPerformer: Supplier, order: Order): AuthorizerResponse {
    return false //
  }

  //@ts-ignore
  delete(actionPerformer: Supplier): AuthorizerResponse {
    return false
  }
}
