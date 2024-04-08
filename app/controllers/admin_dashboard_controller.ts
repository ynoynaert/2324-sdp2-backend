// import type { HttpContext } from '@adonisjs/core/http'

import Notification from '#models/notification'
import { notificationTypes } from '#models/notification_type'
import { HttpContext } from '@adonisjs/core/http'
import { notificationJudgementValidator } from '#validators/notification'
import Account from '#models/account'
import Supplier from '#models/supplier'
import Client from '#models/client'
import AuthController from './auth_controller.js'

interface SIGN_UP {
  account: {
    name: string
    sector: string
    vatNumber: string
    country: string
    zipcode: string
    street: string
    imageUrl: string
  }
  supplier: {
    email: string
    firstname: string
    lastname: string
    phoneNumber: string
    password: string
  }
  client: {
    email: string
    firstname: string
    lastname: string
    phoneNumber: string
    password: string
  }
}

interface ACCOUNT_EDIT {
  name?: string
  email?: string
  sector?: string
  vat_number?: string
  country?: string
  zipcode?: string
  street?: string
  streetNr?: string
  city?: string
  imageUrl?: string

  firstname?: string
  lastname?: string
  phone?: string
  password?: string
}

export type { SIGN_UP, ACCOUNT_EDIT }

export default class AdminDashboardController {
  async notifications({ logger, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 5)
    const filterSeen = request.input('seen')
    const startDate = request.input('startDate')
    const endDate = request.input('endDate')
    const orderBy = request.input('orderBy', 'created_at')
    const orderByOrder = request.input('order', 'desc')
    let notifications

    notifications = await Notification.query()
      .whereIn('notification_type_id', [notificationTypes.ACCOUNT_EDIT, notificationTypes.SIGN_UP])
      .preload('notificationType', (query) => {
        query.select('name')
      })
      .preload('fromAccount', (query) => {
        query.select('name')
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
      .paginate(page, limit)

    const notificationsJSON = notifications.serialize().data
    const notificationsMeta = notifications.toJSON().meta
    notifications = await Promise.all(notifications.map((notification) => notification.toJSON()))

    logger.info('Fetching all notifications')
    return response.status(200).json({ notifications: notificationsJSON, meta: notificationsMeta })
  }

  async notificationJudgeRequest({ logger, params, request, response }: HttpContext) {
    const notifId = params.notificationId
    const notif = await Notification.findOrFail(notifId)
    const judgement = await request.validateUsing(notificationJudgementValidator)

    if (judgement.judgement == 'approved') {
      switch (notif.notificationTypeId) {
        case notificationTypes.SIGN_UP:
          const signUpData: SIGN_UP = notif.data as SIGN_UP
          //checken of emails al mogelijks bestaan!
          const authController = new AuthController()
          const clientEmail = authController.findAccountType(signUpData.client.email)
          const supplierEmail = authController.findAccountType(signUpData.supplier.email)
          if (clientEmail == undefined || supplierEmail == undefined) {
            return response.status(422).json('Email already exists')
          }
          const account: Account = await new Account()
            .fill({
              ...signUpData.account,
            })
            .save()
          await new Supplier()
            .fill({
              accountId: account.id,
              ...signUpData.supplier,
            })
            .save()
          await new Client()
            .fill({
              accountId: account.id,
              ...signUpData.client,
            })
            .save()
          break
        case notificationTypes.ACCOUNT_EDIT:
          const editData: ACCOUNT_EDIT = notif.data as ACCOUNT_EDIT
          const accountB = await Account.findOrFail(notif.accountId)
          switch (notif.type) {
            case 'supplier':
              await accountB.load('supplier')
              const supplier = accountB.supplier
              await supplier
                .merge({
                  firstname: editData.firstname,
                  lastname: editData.lastname,
                  password: editData.password,
                  email: editData.email,
                  phoneNumber: editData.phone,
                })
                .save()
              break

            case 'client':
              await accountB.load('client')
              const client = accountB.client
              await client
                .merge({
                  firstname: editData.firstname,
                  lastname: editData.lastname,
                  password: editData.password,
                  email: editData.email,
                  phoneNumber: editData.phone,
                })
                .save()
              break
          }
          //@ts-ignore
          await accountB
            .merge({
              name: editData.name,
              sector: editData.sector,
              vatNumber: editData.vat_number,
              country: editData.country,
              zipcode: editData.zipcode,
              street: editData.street,
              streetNr: editData.streetNr,
              city: editData.city,
              imageUrl: editData.imageUrl,
            })
            .save()

          break
      }
    } else if (notif.notificationTypeId == notificationTypes.ACCOUNT_EDIT) {
      //notif terugsturen naar dat account & type zeggen dat het niet aanvaard is geweest
      await new Notification().fill({
        accountId: notif.accountId,
        type: notif.type,

        text: 'Your edits were denied.',
        notificationTypeId: notificationTypes.ACCOUNT,
      })
    }
    notif.delete()
    logger.info('Judged notification %s', notifId)
    return response.status(204)
  }
  async notificationShow({ logger, params, response }: HttpContext) {
    const notifId = params.notificationId
    const notif = await Notification.findOrFail(notifId)
    await notif.load('fromAccount', (query) => {
      query.select('name')
    })
    await notif.load('notificationType', (query) => {
      query.select('name')
    })

    logger.info('Fetching notification %s', notifId)
    response.status(200).json(notif.toJSON())
  }

  async accountsIndex({ logger, response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 5)
    const nameFilter = request.input('name', '%')

    const query = Account.query()
      .select('*')
      .orderBy('id', 'desc')
      .where('name', 'LIKE', `%${nameFilter == '%' ? '' : nameFilter}%`)
      .whereNot('is_admin', 1)

    const accounts = await query.paginate(page, limit)
    const JSON = accounts.serialize().data
    const paginationMeta = accounts.toJSON().meta

    logger.info('Fetching all accounts')
    return response.status(200).json({ accounts: JSON, meta: paginationMeta })
  }

  async accountsShow({ logger, params }: HttpContext) {
    const id = params.id
    const account = await Account.find(id)
    await account!.load('client')
    const client = account?.client
    await account!.load('supplier')
    const supplier = account?.supplier

    logger.info('Fetching account %s', id)
    return { ...account?.toJSON(), supplier, client }
  }
}
