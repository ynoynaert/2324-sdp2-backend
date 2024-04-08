// import type { HttpContext } from '@adonisjs/core/http'

import OrderStatus from '#models/orders/order_status'
import { HttpContext } from '@adonisjs/core/http'

export default class OrderStatusesController {
  async index({ logger, response }: HttpContext) {
    const orderStatus = await OrderStatus.query()
    logger.info('Fetching all order statuses')
    return response.status(200).json(orderStatus)
  }
}
