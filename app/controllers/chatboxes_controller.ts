import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Product from '#models/products/product'
import logger from '@adonisjs/core/services/logger'
export default class ChatboxesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    response.status(200).json({
      questions: [
        {
          id: 1,
          question: 'How many products are there on the website?',
          link: `${env.get('HOST')}/api/chatbox/1`,
        },
      ],
    })
    logger.info('Chatbox questions displayed')
  }

  /**
   * Show individual record
   */
  async show({ params, logger, response }: HttpContext) {
    if (params.id == 1) {
      const products = await Product.query()
      logger.info('Fetching number of products on the website')
      return response.status(200).json({ products: products.length })
    }
  }
}
