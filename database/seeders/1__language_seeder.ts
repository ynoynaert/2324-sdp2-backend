// import { LanguageFactory } from '#database/factories/language_factory'
import Language from '#models/language'

import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await new Language()
      .fill({
        name: 'Nederlands',
      })
      .save()

    await new Language()
      .fill({
        name: 'English',
      })
      .save()

    await new Language()
      .fill({
        name: 'Français',
      })
      .save()
    // await LanguageFactory.createMany(10)
  }
}
