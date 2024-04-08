import factory from '@adonisjs/lucid/factories'
import ProductDescription from '#models/products/product_description'

export const ProductDescriptionFactory = factory
  .define(ProductDescription, async ({ faker }) => {
    const description = faker.lorem.sentence()
    const languageId = Math.floor(Math.random() * 5) + 1

    return {
      product_id: languageId,
      languageId,
      listerDescription: description,
      shortDescription: description,
      longDescription: description,
    }
  })
  .build()
