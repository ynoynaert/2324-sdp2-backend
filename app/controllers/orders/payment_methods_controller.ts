import { notificationTypes } from '#models/notification_type'
import PaymentMethod from '#models/orders/payment_method'
import Supplier from '#models/supplier'
import { NotificationFormat } from '#start/events'
import { addPaymentMethodValidator, createPaymentMethodValidator } from '#validators/payment_method'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import db from '@adonisjs/lucid/services/db'

export default class PaymentMethodsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return (await PaymentMethod.all()).map((pm) => pm.serialize())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request }: HttpContext) {
    if (auth.authenticatedViaGuard == 'admin') {
      const payload = await request.validateUsing(createPaymentMethodValidator)
      await new PaymentMethod().fill({ ...payload }).save()

      const suppliers = await Supplier.query()
      suppliers.forEach((sup) => {
        const notification: NotificationFormat = {
          account: sup,
          accountType: 'supplier',
          from: null,
          notifType: notificationTypes.PAYMENT_UPDATE,
          text:
            'Good news, we have added ' +
            payload.method +
            ' as a payment method! Add it to your allowed payments on your profile!',
        }

        emitter.emit('notification:create', notification)
      })
    }
  }

  async addPaymentMethod({ auth, response, request }: HttpContext) {
    //TODO payload validator ... exists and all..

    const payload = await request.validateUsing(addPaymentMethodValidator)

    await db.table('payment_methods_suppliers').insert({
      supplier_id: auth!.user!.id,
      payment_method_id: payload.method,
    })
  }

  async removePaymentMethod({ auth, response, request }: HttpContext) {
    const payload = request.only(['method'])
    await db.rawQuery(
      'DELETE FROM payment_methods_suppliers WHERE supplier_id = :supplier_id AND payment_method_id = :payment_method_id',
      {
        supplier_id: auth!.user!.id,
        payment_method_id: payload.method,
      }
    )
  }
}
