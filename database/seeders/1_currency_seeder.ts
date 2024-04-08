// import { CurrencyFactory } from '#database/factories/currency_factory'
import Currency from '#models/currency'

import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await new Currency()
      .fill({
        name: 'Euro',
      })
      .save()

    await new Currency()
      .fill({
        name: 'Dollar',
      })
      .save()

    await new Currency()
      .fill({
        name: 'Pound',
      })
      .save()

    //await CurrencyFactory.createMany(10)
  }
}
