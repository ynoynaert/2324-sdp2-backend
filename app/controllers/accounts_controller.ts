import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'

export default class AccountsController {
  /**
   * Display a list of resource
   */
  async index({ logger, auth, response }: HttpContext) {
    if (auth.authenticatedViaGuard != 'admin') {
      const accounts = await Account.query().where('is_admin', 0).select('name', 'id');
      return response.status(200).json(accounts);
    }

    logger.info('Fetching all accounts')
    response.status(200).json(await Account.all())
  }

  /**
   * Display a single resource
   */
  async show({ logger, response, request }: HttpContext) {
    const account: Account = await Account.findOrFail(request.param('id'))
    await account.load('client')

    logger.info('Fetching account %s', account.id)
    response.status(200).json(account.serialize())
  }
}
