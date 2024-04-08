import factory from '@adonisjs/lucid/factories'
import ProductPrice from '#models/products/product_price'

export const ProductPriceFactory = factory
  //@ts-ignore
  .define(ProductPrice, async ({ faker }) => {
    const currencyId = Math.floor(Math.random() * 10) + 1
    const price = Math.floor(Math.random() * 100) + 1

    return {
      currencyId,
      price,
      unitOfMeasureId: price,
      quantity: price,
    }
  })
  .build()
