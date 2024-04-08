import Account from '#models/account'
import Client from '#models/client'
import { AccountType } from '#models/helpers/ModelTypes'
import { notificationTypes } from '#models/notification_type'
import Supplier from '#models/supplier'
import { NotificationFormat } from '#start/events'
import { authLoginValidator } from '#validators/login'
import { signUpValidator } from '#validators/sign_up'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  currentAuth: AccountType

  async login({ logger, request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(authLoginValidator)
    const { email, password } = payload
    await this.findAccountType(email)
    switch (this.currentAuth) {
      case 'admin':
        const admin = await Account.findBy('email', email)
        const isRightAdminPassword = await hash.verify(admin!.password, password)
        if (isRightAdminPassword) {
          logger.info('Admin %s logged in', admin!.id)
          return await this.loginUser(auth, admin!, response)
        }
        break
      case 'client':
        const client = await Client.findByOrFail('email', email)
        const isRightClientPassword = await hash.verify(client!.password, password)
        if (isRightClientPassword) {
          logger.info('Client %s logged in', client!.id)
          return await this.loginUser(auth, client!, response)
        }
        break
      case 'supplier':
        const supplier = await Supplier.findBy('email', email)

        const isRightSupplierPassword = await hash.verify(supplier!.password, password)
        if (isRightSupplierPassword) {
          logger.info('Supplier %s logged in', supplier!.id)
          return await this.loginUser(auth, supplier!, response)
        }
        break
    }
    logger.info('Failed login attempt for %s', email)
    return response.status(401).json('Credentials did not match!')
  }

  async loginUser(
    auth: Authenticator<Authenticators>,
    user: Supplier | Account | Client,
    response: unknown
  ): Promise<unknown> {
    try {
      //@ts-ignore
      await auth.use(this.currentAuth).login(user)
      // @ts-ignore
      return response.status(200).json({
        type: this.currentAuth,
        ...user.toJSON(),
      })
    } catch {
      // @ts-ignore
      return response.status(401).json('Credentials did not match!')
    }
  }

  async findAccountType(email: string): Promise<string | undefined> {
    const admin = await Account.findBy('email', email)
    const client = await Client.findBy('email', email)
    const supplier = await Supplier.findBy('email', email)
    if (admin && admin.isAdmin) {
      this.currentAuth = 'admin'
    } else if (client) {
      this.currentAuth = 'client'
    } else if (supplier) {
      this.currentAuth = 'supplier'
    } else {
      this.currentAuth = undefined
    }
    return this.currentAuth
  }

  async logout({ logger, response, auth }: HttpContext) {
    //Log every possible auth off. Limits bugs to multiple authguards.
    await auth.use('admin').logout()
    await auth.use('client').logout()
    await auth.use('supplier').logout()
    logger.info('Logged out')
    return response.status(200).json('Successfully logged out')
  }

  async signup({ logger, request }: HttpContext) {
    const payload = await request.validateUsing(signUpValidator)
    const clientPwdHash = await hash.make(payload.clientPassword)
    const supplierPwdHash = await hash.make(payload.supplierPassword)

    const data = {
      account: {
        name: payload.name,
        sector: payload.sector,
        vatNumber: payload.vat_number,
        country: payload.country,
        zipcode: payload.zipcode,
        city: payload.city,
        streetNr: payload.streetNr,
        street: payload.street,
        imageUrl: payload.image_url,
      },
      supplier: {
        email: payload.supplierEmail,
        firstname: payload.supplierFirstname,
        lastname: payload.supplierLastname,
        phoneNumber: payload.supplierPhone,
        password: supplierPwdHash,
      },
      client: {
        email: payload.clientEmail,
        firstname: payload.clientFirstname,
        lastname: payload.clientLastname,
        phoneNumber: payload.clientPhone,
        password: clientPwdHash,
      },
    }
    const format: NotificationFormat = {
      account: null,
      accountType: null,
      from: null,
      data,
      text: `${data.account.name} wishes to sign up!`,
      notifType: notificationTypes.SIGN_UP,
    }
    logger.info('Signing up %s', data.account.name)
    emitter.emit('notification:create', format)
  }
}
