/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from './kernel.js'
import AccountsController from '#controllers/accounts_controller'
import AuthController from '#controllers/auth_controller'
import OrdersController from '#controllers/orders/orders_controller'
import ProductsController from '#controllers/products/products_controller'
import ProductPricesController from '#controllers/products/product_prices_controller'
import ProductDescriptionsController from '#controllers/products/product_descriptions_controller'
import OrderItemsController from '#controllers/orders/order_items_controller'
import router from '@adonisjs/core/services/router'
import LanguagesController from '#controllers/languages_controller'

import MeController from '#controllers/me_controller'
import CurrenciesController from '#controllers/currencies_controller'
import CategoriesController from '#controllers/categories_controller'
import AdminDashboardController from '#controllers/admin_dashboard_controller'
import PaymentStatusesController from '#controllers/orders/payment_statuses_controller'
import OrderStatusesController from '#controllers/orders/order_statuses_controller'
import ChatboxesController from '#controllers/chatboxes_controller'
import PaymentMethodsController from '#controllers/orders/payment_methods_controller'

router
  .group(() => {
    //hiervoor hoef je geen auth te hebben
    router.resource('products', ProductsController).apiOnly().only(['index', 'show'])
    router.resource('productprices', ProductPricesController).apiOnly().only(['show'])
    router.resource('productdescriptions', ProductDescriptionsController).apiOnly().only(['show'])
    router.resource('languages', LanguagesController).apiOnly().only(['show'])
    router.resource('categories', CategoriesController).apiOnly().only(['index'])
    router.resource('paymentstatus', PaymentStatusesController).apiOnly().only(['index'])
    router.resource('orderstatus', OrderStatusesController).apiOnly().only(['index'])
    router.post('auth/login', [AuthController, 'login'])
    router.post('auth/sign-up', [AuthController, 'signup'])
    router.resource('accounts', AccountsController).apiOnly().only(['index'])
    router.get('/chatbox/:id', [ChatboxesController, 'show'])
    router.get('/chatbox/', [ChatboxesController, 'index'])

    // wat clients & leveranciers & admins kunnen
    router
      .group(() => {
        router.resource('accounts', AccountsController).apiOnly().except(['store', 'index'])
        router.resource('orders', OrdersController).apiOnly().except(['show', 'update'])
        router.get('/orders/:uuid', [OrdersController, 'show'])
        router.patch('/orders/:uuid', [OrdersController, 'update'])

        router.post('auth/logout', [AuthController, 'logout'])
        router.resource('orderitems', OrderItemsController).apiOnly().only(['show'])
        router.get('me', [MeController, 'show'])
        router.put('me', [MeController, 'update'])
        router.get('me/notifications', [MeController, 'notifications'])

        router.get('/me/notifications/unseen', [MeController, 'unseenNotifications'])
        router.get('me/notifications/:notificationId', [MeController, 'notificationShow'])
        router.resource('currencies', CurrenciesController).apiOnly().only(['index', 'show'])
      })
      .use(
        middleware.auth({
          guards: ['client', 'supplier', 'admin'],
        })
      )

    // wat suppliers & admins kunnen
    router
      .group(() => {
        router
          .resource('products', ProductsController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])
        router
          .resource('productprices', ProductPricesController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])
        router
          .resource('productdescriptions', ProductDescriptionsController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])

        router.post('/orders/:id', [OrdersController, 'sendPaymentReminder'])
      })
      .use(
        middleware.auth({
          guards: ['supplier', 'admin'],
        })
      )

    router
      .group(() => {
        router
          .resource('orderitems', OrderItemsController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])
      })
      .use(
        middleware.auth({
          guards: ['client', 'admin'],
        })
      )

    // wat alleen clients kunnen
    router
      .group(() => {
        router.post('orders/:uuid/pay', [OrdersController, 'pay'])
      })
      .use(
        middleware.auth({
          guards: ['client'],
        })
      )

    // wat alleen suppliers kunnen
    router
      .group(() => {
        router.post('supplier/addPaymentMethod', [PaymentMethodsController, 'addPaymentMethod'])
        router.delete('supplier/removePaymentMethod', [
          PaymentMethodsController,
          'removePaymentMethod',
        ])
        router.get('supplier/paymentMethods', [PaymentMethodsController, 'index'])
      })

      .use(
        middleware.auth({
          guards: ['supplier'],
        })
      )

    //wat alleen admins kunnen
    router
      .group(() => {
        router
          .resource('languages', LanguagesController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])
        router
          .resource('currencies', CurrenciesController)
          .apiOnly()
          .only(['store', 'destroy', 'update'])
        router.resource('categories', CategoriesController).apiOnly().except(['index'])
        router.get('admin/notifications', [AdminDashboardController, 'notifications'])
        router.get('dashboard/notifications/:notificationId', [
          AdminDashboardController,
          'notificationShow',
        ])
        router.post('dashboard/notifications/:notificationId', [
          AdminDashboardController,
          'notificationJudgeRequest',
        ])
        router.get('admin/accounts', [AdminDashboardController, 'accountsIndex'])
        router.get('dashboard/accounts/:id', [AdminDashboardController, 'accountsShow'])
      })

      .use(
        middleware.auth({
          guards: ['admin'],
        })
      )

    // wat alleen suppliers kunnen
    router
      .group(() => {
        router.get('me/products', [MeController, 'products'])
      })
      .use(
        middleware.auth({
          guards: ['supplier'],
        })
      )
  })
  .prefix('api')
