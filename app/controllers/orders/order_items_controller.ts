import type { HttpContext } from '@adonisjs/core/http'
import OrderItem from '#models/order_item'
import OrderItemPolicy from '#policies/order_item_policy'
import { createOrderItemValidator } from '#validators/order_item'
import Suborder from '#models/orders/suborder'
import Product from '#models/products/product'
import Order from '#models/order'
import { cuid } from '@adonisjs/core/helpers'

export default class OrderItemsController {
  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(OrderItemPolicy).denies('create')) {
      logger.info('User tried to create an order item without permission')
      response.status(403).json('Oopsie!')
    } else {
      const payload = await request.validateUsing(createOrderItemValidator)

      // we get an order ID, but what we need to check if the order already has a suborder for that supplier (orders are split in suborders, d)
      // if so, great we can use that suborder, if not, we have to make it.
      //big TODO: check if this works
      const product = await Product.find(payload.product_id)
      const orderIBelongTo = await Order.findBy('uuid', payload.order_uuid)

      const suborderExists = await Suborder.query()
        .where('order_id', orderIBelongTo!.id)
        .andWhere('supplier_id', product?.supplierId!)
        .first()
      if (suborderExists) {
        const orderItem = await OrderItem.create({
          productId: payload.product_id,
          quantity: payload.quantity,
          unitOfMeasureId: payload.unit_of_measure_id,
          netAmount: payload.net_amount,
          suborderId: suborderExists.id,
        })
        await orderItem.save()
      } else {
        const newSuborder = await Suborder.create({
          orderId: orderIBelongTo?.id,
          supplierId: product?.supplierId,
          uuid: cuid(),
        })
        const orderItem = await OrderItem.create({
          productId: payload.product_id,
          quantity: payload.quantity,
          unitOfMeasureId: payload.unit_of_measure_id,
          netAmount: payload.net_amount,
          suborderId: newSuborder.id,
        })
        await orderItem.save()
      }

      // @ts-ignore

      logger.info('Order item created')
      response.status(204)
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response, bouncer, auth }: HttpContext) {
    const orderItem = await OrderItem.findOrFail(params.id)
    // @ts-ignore
    if (
      auth.authenticatedViaGuard == 'admin' ||
      // @ts-ignore
      (await bouncer.with(OrderItemPolicy).allows('show', orderItem))
    ) {
      logger.info('Fetching order item %s', orderItem.id)
      response.status(200).json(orderItem.toJSON())
    } else {
      logger.info('User tried to fetch an order item without permission')
      response.status(401)
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request, response }: HttpContext) {
    const orderItem = await OrderItem.findOrFail(params.id)
    const payload = await request.validateUsing(createOrderItemValidator)
    const { product_id, quantity, unit_of_measure_id, net_amount } = payload
    const product = await Product.find(product_id)
    await product?.load('supplier')
    const supplier = product?.supplier
    // @ts-ignore
    const supId = supplier?.id
    /*

    order_uuid: vine.string().exists(exists('orders', 'uuid')),
      product_id: vine.number().positive().exists(exists('products', 'id')),
      quantity: vine.number().positive().withoutDecimals(),
      unit_of_measure_id: vine.number().positive(),
      net_amount: vine.number().positive(),
    */

    await orderItem
      .merge({
        productId: product_id,
        quantity,
        unitOfMeasureId: unit_of_measure_id,
        netAmount: net_amount,
      })
      .save()

    logger.info('Order item updated')
    response.status(200).json('Done!')
  }

  /**
   * Delete record
   */
  async destroy({ logger, params, response }: HttpContext) {
    const orderItem = await OrderItem.findOrFail(params.id)
    await orderItem.delete()
    logger.info('Order item %s deleted', orderItem.id)
    response.status(200).json('Done!')
  }
}
