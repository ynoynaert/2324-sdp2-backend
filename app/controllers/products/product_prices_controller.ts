import type { HttpContext } from '@adonisjs/core/http'
import ProductPrice from '#models/products/product_price'
import ProductPricePolicy from '#policies/product_price_policy'
import { createProductPriceValidator } from '#validators/product_price'

export default class ProductPricesController {
  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(ProductPricePolicy).denies('create')) {
      logger.info('User tried to create a product price without permission')
      response.status(403).json('Oopsie!')
    } else {
      const payload = await request.validateUsing(createProductPriceValidator)
      // @ts-ignore
      const productPrice = await ProductPrice.create(payload)
      logger.info('Product price created')
      response.status(200).json('Done!')
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response }: HttpContext) {
    logger.info('Fetching product price %s', params.id)
    response.status(200).json(await ProductPrice.findOrFail(params.id))
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request, response }: HttpContext) {
    const productPrice = await ProductPrice.findOrFail(params.id)
    const payload = await request.validateUsing(createProductPriceValidator)
    productPrice.merge(payload)
    await productPrice.save()
    logger.info('Product price updated')
    response.status(200).json(productPrice)
  }

  /**
   * Delete record
   */
  async destroy({ logger, params, response }: HttpContext) {
    const productPrice = await ProductPrice.findOrFail(params.id)
    await productPrice.delete()
    logger.info('Product price %s deleted', productPrice.id)
    response.status(204)
  }
}
