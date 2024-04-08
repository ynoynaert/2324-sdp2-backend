import Currency from '#models/currency'
import type { HttpContext } from '@adonisjs/core/http'
import CurrencyPolicy from '#policies/currency_policy'
import { createCurrencyValidator } from '#validators/currency'

export default class CurrenciesController {
  /**
   * Display a list of resource
   */
  async index({ logger, response }: HttpContext) {
    const currencies = await Currency.all()
    logger.info('Fetching all currencies')
    return response.status(200).json(currencies)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(CurrencyPolicy).denies('create')) {
      logger.info('User tried to create a currency without permission')
      response.status(403).json('Oopsie!')
    } else {
      const payload = await request.validateUsing(createCurrencyValidator)
      // @ts-ignore
      const currency = await Currency.create(payload)
      logger.info('Currency created')
      response.status(200).json('Done!')
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response }: HttpContext) {
    const currency = await Currency.findOrFail(params.id)
    logger.info('Fetching currency %s', currency.id)
    return response.status(200).json(currency)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request, response, bouncer }: HttpContext) {
    const currency = await Currency.findOrFail(params.id)
    const payload = await request.validateUsing(createCurrencyValidator)
    // @ts-ignore
    if (await bouncer.with(CurrencyPolicy).denies('edit')) {
      logger.info('User tried to edit a currency without permission')
      response.status(403).json('Oopsie!')
    } else {
      currency.merge(payload)
      await currency.save()
      logger.info('Currency updated')
      return response.status(200).json('Done!')
    }
  }

  /**
   * Delete record
   */
  async destroy({ logger, params, bouncer, response }: HttpContext) {
    const currency = await Currency.findOrFail(params.id)
    // @ts-ignore
    if (await bouncer.with(CurrencyPolicy).denies('delete')) {
      logger.info('User tried to delete a currency without permission')
      response.status(403).json('Oopsie!')
    } else {
      await currency.delete()
      logger.info('Currency %s deleted', currency.id)
      return response.status(200).json('Done!')
    }
  }
}
