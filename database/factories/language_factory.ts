import factory from '@adonisjs/lucid/factories'
import Language from '#models/language'

export const LanguageFactory = factory
  .define(Language, async ({ faker }) => {
    const name = faker.lorem.sentence()
    return {
      name,
    }
  })
  .build()
