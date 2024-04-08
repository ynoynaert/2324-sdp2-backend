import type { HttpContext } from '@adonisjs/core/http'

import PaymentStatus from '#models/orders/payment_status'

export default class PaymentStatusesController {
  async index({ logger, response }: HttpContext) {
    const paymentStatus = await PaymentStatus.query()
    logger.info('Fetching all payment statuses')
    return response.status(200).json(paymentStatus)
  }
}
