import type { HttpContext } from '@adonisjs/core/http'
import OrderPolicy from '#policies/order_policy'
import Order from '#models/order'
import { createOrderValidator } from '#validators/order'
import Client from '#models/client'
import { finishOrderValidator } from '#validators/product'
import emitter from '@adonisjs/core/services/emitter'
import { cuid } from '@adonisjs/core/helpers'
import Supplier from '#models/supplier'
import Suborder from '#models/orders/suborder'
import { PAYMENT_STATUSES } from '#models/orders/payment_status'
import { NotificationFormat } from '#start/events'
import { notificationTypes } from '#models/notification_type'
import SuborderPolicy from '#policies/suborder_policy'

export default class OrdersController {
  /**
   * Display a list of resource
   */
  async index({ logger, auth, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 5)
    const filterOrderStatus = request.input('orderstatus', [1, 2, 3])
    const filterPaymentStatus = request.input('paymentstatus', [1, 2])
    //const filterAccount = request.input('account')
    const orderByRequest = request.input('orderBy', 'created_at')
    const orderByOrder = request.input('order', 'desc')
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')
    const filterUuid = request.input('uuid', '%')

    switch (auth.authenticatedViaGuard) {
      case 'admin':
        let ordersQuery = Order.query()
          .select('*')
          .preload('paymentStatus')
          .preload('orderStatus')
          // TODO werkt niet
          // .preload('suborders', (builder) => {
          //   builder.preload('orderStatus')
          // })
          .whereIn('order_status_id', [...filterOrderStatus])
          .whereIn('payment_status_id', [...filterPaymentStatus])
          .where('uuid', 'LIKE', `%${filterUuid == '%' ? '' : filterUuid}%`)
          .where((builder) => {
            if (startDate) {
              builder.where('created_at', '>=', new Date(startDate))
            }
            if (endDate) {
              builder.where('created_at', '<=', new Date(endDate))
            }
          })

        if (orderByRequest === 'paymentStatus') {
          // @ts-ignore
          ordersQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('payment_statuses')
              .whereColumn('payment_status_id', 'payment_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else if (orderByRequest === 'orderStatus') {
          // @ts-ignore
          ordersQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('order_statuses')
              .innerJoin('suborders', 'suborders.order_status_id', 'order_statuses.id')
              .whereColumn('orders.id', 'suborders.order_id')
              .whereColumn('suborders.order_status_id', 'order_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else {
          ordersQuery = ordersQuery.orderBy(orderByRequest, orderByOrder)
        }

        let orders = await ordersQuery.paginate(page, limit)

        orders.map((order) => {
          order.serialize()
          return order.toJSON()
        })
        logger.info('Fetching all orders for admin')
        return orders

      case 'client':
        const client = await Client.findOrFail(auth.user!.id)
        let clientQuery = Order.query()
          .select('*')
          .preload('account', (builder) => builder.select('name'))
          .preload('paymentStatus')
          .preload('orderStatus')
          .where('account_id', '=', client.accountId)
          // TODO werkt niet, krijgen orderstatus niet mee
          // .preload('suborders', (builder) => {
          //   builder.preload('orderStatus')
          // })
          .whereIn('order_status_id', [...filterOrderStatus])
          .whereIn('payment_status_id', [...filterPaymentStatus])
          .where('uuid', 'LIKE', `%${filterUuid == '%' ? '' : filterUuid}%`)
          .where((builder) => {
            if (startDate) {
              builder.where('created_at', '>=', new Date(startDate))
            }
            if (endDate) {
              builder.where('created_at', '<=', new Date(endDate))
            }
          })

        if (orderByRequest === 'paymentStatus') {
          // @ts-ignore
          clientQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('payment_statuses')
              .whereColumn('payment_status_id', 'payment_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else if (orderByRequest === 'orderStatus') {
          // @ts-ignore
          clientQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('order_statuses')
              .innerJoin('suborders', 'suborders.order_status_id', 'order_statuses.id')
              .whereColumn('orders.id', 'suborders.order_id')
              .whereColumn('suborders.order_status_id', 'order_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else {
          clientQuery = clientQuery.orderBy(orderByRequest, orderByOrder)
        }

        let clientOrder = await clientQuery.paginate(page, limit)

        clientOrder.map((order) => {
          clientOrder.serialize()
          return order.toJSON()
        })

        logger.info('Fetching all orders for client')
        return clientOrder

      case 'supplier':
        const supplier = await Supplier.findOrFail(auth.user!.id)
        let supplierQuery = Suborder.query()
          .select('*')
          .preload('orderStatus')
          .preload('order')
          .preload('order', (builder) => {
            builder.preload('account', (bldr) => bldr.select('name'))
            builder.preload('paymentStatus')
          })
          // .whereIn('order', (builder) => {
          //   builder.whereIn('paymentStatusId', [...filterPaymentStatus])
          // })
          // .whereIn('paymentStatusId', [...filterPaymentStatus])
          .whereIn('payment_status_id', [...filterPaymentStatus])
          .whereIn('order_status_id', [...filterOrderStatus])
          .where('supplier_id', supplier.id)
          .where('uuid', 'LIKE', `%${filterUuid == '%' ? '' : filterUuid}%`)
          .where((builder) => {
            if (startDate) {
              builder.where('created_at', '>=', new Date(startDate))
            }
            if (endDate) {
              builder.where('created_at', '<=', new Date(endDate))
            }
          })

        if (orderByRequest === 'paymentStatus') {
          // @ts-ignore
          supplierQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('payment_statuses')
              .whereColumn('payment_status_id', 'payment_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else if (orderByRequest === 'orderStatus') {
          // @ts-ignore
          supplierQuery.orderBy((buil) => {
            // @ts-ignore
            buil
              // @ts-ignore
              .select('status')
              .from('order_statuses')
              .innerJoin('suborders', 'suborders.order_status_id', 'order_statuses.id')
              .whereColumn('orders.id', 'suborders.order_id')
              .whereColumn('suborders.order_status_id', 'order_statuses.id')
              .orderBy('status', orderByOrder)
          }, orderByOrder)
        } else {
          supplierQuery = supplierQuery.orderBy(orderByRequest, orderByOrder)
        }

        let supplierOrder = await supplierQuery.paginate(page, limit)

        supplierOrder.map((order) => {
          supplierOrder.serialize()
          return order.toJSON()
        })

        logger.info('Fetching all orders for supplier')
        return supplierOrder
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response, auth }: HttpContext) {
    //@ts-ignore
    if (await bouncer.with(OrderPolicy).denies('create')) {
      response.status(403).json('Oopsie!')
    } else {
      //Ter info, als dit faalt, gaat de rest niet door.
      const payload = await request.validateUsing(createOrderValidator)
      // order aanmaken & persisten naar database
      //@ts-ignore

      const client = auth.user! as Client
      const uuid = cuid()
      // @ts-ignore
      const order = await Order.create({ accountId: client.accountId, uuid, ...payload })
      await order.save()
      logger.info('Order created')
      response.status(204)
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response, bouncer, auth }: HttpContext) {
    const order = await Order.findBy('uuid', params.uuid)
    const suborder = await Suborder.findBy('uuid', params.uuid)

    const orderExists = order != null
    const suborderExists = suborder != null
    if (!orderExists && !suborderExists) {
      return response.status(404).json('Something went wrong')
    }
    //todo bouncer
    switch (auth.authenticatedViaGuard) {
      case 'client':
        //@ts-ignore
        if (orderExists && (await bouncer.with(OrderPolicy).allows('show', order))) {
          const clientOrder = await this.mapOrderData(order!)
          logger.info('Fetching order %s', params.uuid)
          return response.status(200).json(clientOrder)
        }
        logger.info('Failed to fetch order %s', params.uuid)
        return response.status(404).json('Something went wrong')

      case 'supplier':
        //@ts-ignore
        if (suborderExists && (await bouncer.with(SuborderPolicy).allows('show', suborder))) {
          const suborderData = await this.mapSuborderData(suborder!)
          logger.info('Fetching suborder %s', params.id)
          return response.status(200).json(suborderData)
        }
        logger.info('Failed to fetch suborder %s', params.uuid)
        return response.status(404).json('Something went wrong')

      case 'admin':
        if (orderExists) {
          const clientOrder = await this.mapOrderData(order!)
          logger.info('Fetching order %s', params.uuid)
          return response.status(200).json(clientOrder)
        } else if (suborderExists) {
          const suborderData = await this.mapSuborderData(suborder!)
          logger.info('Fetching suborder %s', params.uuid)
          return response.status(200).json(suborderData)
        } else {
          logger.info('Failed to fetch order %s', params.uuid)
          return response.status(404)
        }
    }
  }

  async mapOrderData(order: Order) {
    await order!.load('suborders', (builder) => {
      builder
        .preload('orderItems', (bldr) => {
          bldr.preload('product', (build) => {
            build.preload('productPrice')
            build.preload('supplier', (b) => {
              b.preload('account')
            })
          })
        })
        .preload('orderStatus')
    })

    // Extracting product information from the loaded data
    const productsWithPrice = order.suborders.flatMap((suborder) =>
      suborder.orderItems.map((orderItem) => ({
        id: orderItem.product.id,
        supplier: orderItem.product.supplier.account.name,
        productName: orderItem.product.name,
        unitPrice: orderItem.product.productPrice[0].price, // Assuming there's only one price per product
        imageUrl: orderItem.product.imageUrl,
        fullPrice: orderItem.netAmount,
        quantity: orderItem.quantity,
      }))
    )
    const fullPrice = await Order.getFullPrice(order!)
    // Extracting order information outside the flatMap
    await order?.load('account')
    await order?.load('orderStatus')
    await order?.load('paymentStatus')
    const account = order?.account
    const orderInfo = {
      accountName: account.name,
      btw: account?.vatNumber,
      fullPrice,
      id: order!.uuid,
      accountId: order!.accountId,
      currencyId: order!.currencyId,
      billingAddressStreet: order!.billingAddressStreet,
      billingAddressZipcode: order!.billingAddressZipcode,
      billingAddressCountry: order!.billingAddressCountry,
      shippingAddressStreet: order!.shippingAddressStreet,
      shippingAddressZipcode: order!.shippingAddressZipcode,
      shippingAddressCountry: order!.shippingAddressCountry,
      shippingAddressCity: order!.shippingAddressCity,
      shippingAddressStreetNr: order!.shippingAddressStreetNr,
      billingAddressCity: order!.billingAddressCity,
      billingAddressStreetNr: order!.billingAddressStreetNr,
      vatType: order!.vatType,

      remark: order!.remark,
      paymentPeriod: order!.paymentPeriod,
      paymentStatus: order!.paymentStatus,
      orderStatus: order!.orderStatus,
    }

    return { orderMeta: orderInfo, products: productsWithPrice }
  }

  async mapSuborderData(suborder: Suborder) {
    await suborder?.load('order')

    const order = suborder.order
    await order.load('account')

    await suborder.load('orderItems')

    const orderItems = suborder.orderItems
    // Using map to preserve the promises returned by oi.load()
    const productLoadingPromises = orderItems.map(async (oi) => {
      await oi.load('product', (builder) => {
        builder.preload('productDescription')
      })
    })

    // Waiting for all product loading promises to resolve
    await Promise.all(productLoadingPromises)

    const productsWithPrice = suborder.orderItems.map((orderItem) => ({
      id: orderItem.product.id,
      productName: orderItem.product.name,
      imageUrl: orderItem.product.imageUrl,
      fullPrice: orderItem.netAmount,
      quantity: orderItem.quantity,
    }))

    const fullPrice = await Suborder.getFullPrice(suborder!)
    // Extracting order information outside the flatMap
    await order?.load('account')
    await order?.load('paymentStatus')
    await order?.load('orderStatus')
    const account = order?.account
    const orderInfo = {
      btw: account?.vatNumber,
      id: suborder!.uuid,
      accountId: order!.accountId,
      accountName: account.name,
      currencyId: order!.currencyId,
      fullPrice,
      billingAddressStreet: order!.billingAddressStreet,
      billingAddressZipcode: order!.billingAddressZipcode,
      billingAddressCountry: order!.billingAddressCountry,
      shippingAddressStreet: order!.shippingAddressStreet,
      shippingAddressZipcode: order!.shippingAddressZipcode,
      shippingAddressCountry: order!.shippingAddressCountry,
      shippingAddressCity: order!.shippingAddressCity,
      shippingAddressStreetNr: order!.shippingAddressStreetNr,
      billingAddressCity: order!.billingAddressCity,
      billingAddressStreetNr: order!.billingAddressStreetNr,
      vatType: order!.vatType,
      paymentStatus: order!.paymentStatus,
      orderStatus: order!.orderStatus,
      remark: order!.remark,
      paymentPeriod: order!.paymentPeriod,
    }

    return { orderMeta: orderInfo, products: productsWithPrice }
  }

  /**
   * => Assuming that this endpoint isnt used for much else than finishing an order.
   *
   */
  async update({ logger, params, request }: HttpContext) {
    const order = await Order.findBy('uuid', params.uuid)
    const payload = await request.validateUsing(finishOrderValidator)
    // @ts-ignore
    await order!.merge(payload).save()
    logger.info('Order updated')
    // @ts-ignore
    emitter.emit('order:finished', order)
  }

  /**
   * Delete record
   */
  async destroy({ logger, params }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    logger.info('Order %s deleted', order.id)
    await order.delete()
  }

  async sendPaymentReminder({ logger, params, auth, response }: HttpContext) {
    const suborder = await Suborder.findBy('uuid', params.id)
    if (suborder?.supplierId != auth.user!.id) {
      logger.info('User tried to send payment reminder without permission')
      return response.status(403).json('Something went wrong')
    }

    await suborder!.load('supplier')
    const supplier = suborder!.supplier
    await supplier.load('account')
    await suborder!.load('order')
    const order = suborder!.order
    await order.load('account')
    const format: NotificationFormat = {
      account: supplier,
      from: suborder!.supplierId,
      accountType: 'client',
      text: 'You have a payment reminder from ' + supplier.account.name,
      notifType: notificationTypes.PAYMENT_REMINDER,
      data: { orderId: order.uuid },
    }
    logger.info('Payment reminder sent')
    emitter.emit('notification:create', format)
  }

  async pay({ logger, auth, params, response }: HttpContext) {
    // client endpoint // admins kunnen niet voor klant betalen...
    // notif aanmaken dat er betaalt is geweest
    // paymentstatus aanpassen naar finished
    // order status aanpassen naar finished
    // klant mogelijks alleen maar laten betalen als de orderstatus op received staat
    // => nieuw order status
    //TODO hier zou ergens logica in moeten ma ja, ..

    //TODO: checken of orderstatus al op betaalt staat

    const order = await Order.findBy('uuid', params.uuid)
    const client: Client = auth.user! as Client
    await client.load('account')
    const clientAccount = client.account

    if (order && order.accountId == client.accountId) {
      await order.load('suborders')
      const suborders = order.suborders

      const promises = suborders.map(async (sub) => {
        await sub.load('supplier')
        const supplier = sub.supplier
        sub.paymentStatusId = PAYMENT_STATUSES.PAID
        const format: NotificationFormat = {
          account: supplier,
          from: client.accountId,
          accountType: 'supplier',
          text: 'Payment received from ' + clientAccount.name,
          notifType: notificationTypes.PAYMENT_UPDATE,
          data: { order: sub.uuid },
        }
        await sub.save()
        emitter.emit('notification:create', format)
      })

      await Promise.all(promises)

      order.paymentStatusId = PAYMENT_STATUSES.PAID
      await order.save()
      logger.info('Payment received from %s', clientAccount.name)
      return response.status(204)
    }
    logger.info('User tried to pay without permission')
    return response.status(404).json('Something went wrong.')
  }
}
