import Account from '#models/account'
import Client from '#models/client'
import { AccountType } from '#models/helpers/ModelTypes'
import Notification from '#models/notification'
import { notificationTypes } from '#models/notification_type'
import Product from '#models/products/product'
import Supplier from '#models/supplier'
import { NotificationFormat } from '#start/events'
import { updateAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

export default class MeController {
  async show({ logger, response, auth }: HttpContext) {
    switch (auth.authenticatedViaGuard) {
      case 'admin':
        logger.info('Admin %s details showed', auth.user!.id)
        return response.json({
          type: auth.authenticatedViaGuard,
          ...auth.user?.serialize(),
        })
      case 'client':
        const userClient = auth.user as Client
        //@ts-ignore
        await userClient.load('account')
        logger.info('%s %s details showed', auth.authenticatedViaGuard, userClient.id)
        return userClient
      case 'supplier':
        const user = auth.user as Supplier
        //@ts-ignore
        await user.load('account')
        await user.load('paymentMethods')
        logger.info('%s %s details showed', auth.authenticatedViaGuard, user.id)
        return user
    }
  }

  async products({ logger, response, request, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 12)
    const filterName = request.input('name', '%')
    const filterCategory = request.input('category')
    const filterMinPrice = request.input('minPrice', 0)
    const filterMaxPrice = request.input('maxPrice', 1000)

    const filterAvailable = request.input('product_availability')
    const orderByRequest = request.input('orderBy', 'id')
    const orderByOrder = request.input('order', 'asc')

    const query = Product.query()
      .select('*')
      .preload('category')
      .preload('productPrice')
      .preload('productDescription')
      .preload('supplier')
      .where('name', 'LIKE', `%${filterName == '%' ? '' : filterName}%`)
      .where((builder) => {
        if (filterAvailable !== undefined) {
          builder.where('product_availability', filterAvailable)
        }
      })
      .whereHas('category', (builder) => {
        if (filterCategory) {
          builder.where('id', '=', filterCategory)
        }
      })
      .whereHas('productPrice', (builder2) => {
        builder2.whereBetween('price', [filterMinPrice, filterMaxPrice])
      })
      .whereHas('supplier', (builder3) => {
        builder3.where('id', auth.user.id)
      })

    if (orderByRequest === 'price') {
      //@ts-ignore
      query.orderBy((buil) => {
        //@ts-ignore
        buil
          .select('price')
          .from('product_prices')
          .whereColumn('product_id', 'products.id')
          .orderBy(orderByRequest, orderByOrder)
      }, orderByOrder)
    } else {
      query.orderBy(orderByRequest, orderByOrder)
    }

    const products = await query.paginate(page, limit)
    const productsJSON = products.serialize().data
    const paginationMeta = products.toJSON().meta
    logger.info('Fetching all products')
    return response.status(200).json({ products: productsJSON, meta: paginationMeta })
  }

  async update({ logger, response, request, auth }: HttpContext) {
    if (auth.authenticatedViaGuard == 'admin') {
      return response.status(403)
    }
    const user = auth.user as Client | Supplier
    await request.validateUsing(updateAccountValidator)
    //@ts-ignore
    const payload = request.body()
    const type: AccountType = auth.authenticatedViaGuard

    //const user =  auth.user;
    //await user?.load('account');
    const data: NotificationFormat = {
      account: auth.user!,
      accountType: type,
      data: payload,
      notifType: notificationTypes.ACCOUNT_EDIT,
      text: 'Account edit requested',
      from: user!.accountId,
    }

    emitter.emit('notification:create', data)
    logger.info('Account edit requested for %s', auth.user!.id)
    return response.status(200).json('Account edit requested')
  }

  async notifications({ logger, auth, response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 5)
    const filterSeen = request.input('seen')
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')
    const orderBy = request.input('orderBy', 'created_at')
    const orderByOrder = request.input('order', 'desc')
    let isAdmin = auth.user instanceof Account && auth.user.isAdmin == true
    let notifications

    notifications = Notification.query()
      .preload('fromAccount', (bldr) => {
        bldr.select('name')
      })
      .preload('notificationType', (bldr) => {
        bldr.select('name')
      })
      .where((builder) => {
        if (filterSeen !== undefined) {
          builder.where('seen', filterSeen)
        }
      })
      .where((builder) => {
        if (startDate) {
          builder.where('created_at', '>=', new Date(startDate))
        }
        if (endDate) {
          builder.where('created_at', '<=', new Date(endDate))
        }
      })
      .orderBy(orderBy, orderByOrder)

    if (!isAdmin) {
      const user = auth.user as Supplier | Client
      //@ts-ignore
      await user.load('account')
      const account: Account = user.account

      notifications.where('type', auth.authenticatedViaGuard!).where('account_id', account.id)
    } else {
      notifications.whereIn('notification_type_id', [
        notificationTypes.ACCOUNT_EDIT,
        notificationTypes.SIGN_UP,
      ])
    }
    const notifs = await notifications.orderBy('created_at', orderByOrder).paginate(page, limit)

    const notificationsJSON = notifs.serialize().data
    const notificationsMeta = notifs.toJSON().meta
    notifications = await Promise.all(notifs.map((notifs) => notifs.toJSON()))
    const promises = notifs.map(async (notif) => {
      notif.received = true
      await notif.save()
    })

    logger.info('Fetching all notifications')
    await Promise.all(promises)
    return response.status(200).json({ notifications: notificationsJSON, meta: notificationsMeta })
  }

  async unseenNotifications({ logger, response, auth }: HttpContext) {
    let length
    switch (auth.authenticatedViaGuard) {
      case 'admin':
        const notifications = await Notification.query()
          .whereIn('notification_type_id', [
            notificationTypes.SIGN_UP,
            notificationTypes.ACCOUNT_EDIT,
          ])
          .where('seen', 0)
          .andWhere('received', 1)
        length = notifications.length
        break
      case 'client':
        const user = auth.user! as Client
        const notifications2 = await Notification.query()
          .where('account_id', user.accountId)
          .where('type', auth.authenticatedViaGuard)
          .where('seen', 0)
          .andWhere('received', 1)
          .select('id')
        length = notifications2.length
        break
      case 'supplier':
        const supplier = auth.user! as Supplier
        const notifications3 = await Notification.query()
          .where('account_id', supplier.accountId)
          .where('type', auth.authenticatedViaGuard)
          .where('seen', 0)
          .andWhere('received', 1)
          .select('id')

        length = notifications3.length
    }

    logger.info('Fetching number of unseen notifications for %s', auth.user!.id)
    return response.status(200).json({ unseen: length })
  }

  async notificationShow({ logger, params, response, auth }: HttpContext) {
    const notification = await Notification.findOrFail(params.notificationId)
    notification.seen = true
    notification.received = true
    await notification.save()
    await notification.load('fromAccount', (query) => {
      query.select('name')
    })
    await notification.load('notificationType', (query) => {
      query.select('name')
    })

    switch (auth.authenticatedViaGuard) {
      case 'admin':
        logger.info('Fetching notification %s', notification.id)
        return response.status(200).json({ notification })
      case 'client': {
        const client = auth.user as Client
        if (notification.accountId == client.accountId) {
          logger.info('Fetching notification %s for client %s', notification.id, client.accountId)
          return response.status(200).json({ notification })
        }
      }
      case 'supplier': {
        const supplier = auth.user as Supplier
        if (notification.accountId == supplier.accountId) {
          logger.info(
            'Fetching notification %s for supplier %s',
            notification.id,
            supplier.accountId
          )
          return response.status(200).json({ notification })
        }
      }
    }
  }
}
