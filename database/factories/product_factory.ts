import factory from '@adonisjs/lucid/factories'
import Product from '#models/products/product'
import { ProductPriceFactory } from './product_price_factory.js'
import { ProductDescriptionFactory } from './product_description_factory.js'

export const ProductFactory = factory
  .define(Product, async ({ faker }) => {
    let unitOfMeasureId = Math.floor(Math.random() * 10 + 1)
    let productAvailability = Math.floor(Math.random() * 10 + 1) > 5 ? true : false
    const categoryId = Math.floor(Math.random() * 10 + 1)
    const description = faker.lorem.sentence()

    return {
      name: description,
      unitOfMeasureId,
      categoryId,
      productAvailability,
    }
  })
  .relation('productPrice', () => ProductPriceFactory) // TOP werk !
  .relation('productDescription', () => ProductDescriptionFactory)
  .build()
