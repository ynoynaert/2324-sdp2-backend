import type { HttpContext } from '@adonisjs/core/http'
import ProductDescription from '#models/products/product_description'
import ProductDescriptionPolicy from '#policies/product_description_policy'
import { createProductDescriptionValidator } from '#validators/product_description'

export default class ProductDescriptionsController {
  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(ProductDescriptionPolicy).denies('create')) {
      logger.info('User tried to create a product description without permission')
      response.status(403).json('Oopsie!')
    } else {
      const payload = await request.validateUsing(createProductDescriptionValidator)
      // @ts-ignore
      const productDescription = await ProductDescription.create(payload)
      logger.info('Product description created')
      response.status(200).json('Done!')
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response }: HttpContext) {
    logger.info('Fetching product description %s', params.id)
    response.status(200).json(await ProductDescription.findOrFail(params.id))
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request, response }: HttpContext) {
    const productDescription = await ProductDescription.findOrFail(params.id)
    const payload = await request.validateUsing(createProductDescriptionValidator)
    productDescription.merge(payload)
    await productDescription.save()
    logger.info('Product description updated')
    response.status(200).json(productDescription)
  }

  /**
   * Delete record
   */
  async destroy({ logger, params, response }: HttpContext) {
    const productDescription = await ProductDescription.findOrFail(params.id)
    await productDescription.delete()
    logger.info('Product description %s deleted', productDescription.id)
    response.status(204)
  }
}
