import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Supplier from '#models/supplier'

export default class ProductDescriptionPolicy extends BasePolicy {
  //@ts-ignore
  create(actionPerformer: Supplier): AuthorizerResponse {
    return true
  }

  //@ts-ignore
  edit(actionPerformer: Supplier): AuthorizerResponse {
    return true
  }

  //@ts-ignore
  delete(actionPerformer: Supplier): AuthorizerResponse {
    return true
  }
}

