import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ logger }: HttpContext) {
    logger.info('Fetching all categories')
    return (await Category.all()).map((cat) => cat.serialize())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, response }: HttpContext) {
    const payload = await request.validateUsing(createCategoryValidator)
    await new Category().fill(payload).save()
    logger.info('Category created')
    return response.status(204)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, response, request }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const payload = await request.validateUsing(createCategoryValidator)
    await category.merge(payload).save()
    logger.info('Category updated')
    return response.status(204)
  }

  /**
   * Delete record
   */
  async destroy({ logger, params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    logger.info('Category %s deleted', category.id)
    await category.delete()
  }
}
