import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Account from '#models/account'


export default class CurrencyPolicy extends BasePolicy {
    permissionCheck(actionPerformer: Account): boolean {
        // TODO true weghalen
        return true || actionPerformer.isAdmin
    }

    create(actionPerformer: Account): AuthorizerResponse {
        return this.permissionCheck(actionPerformer)
    }

    edit(actionPerformer: Account): AuthorizerResponse {
        return this.permissionCheck(actionPerformer)
    }

    delete(actionPerformer: Account): AuthorizerResponse {
        return this.permissionCheck(actionPerformer)
    }
}