import ProductPrice from '#models/products/product_price'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ProductPrice.createMany([
      {
        productId: 1,
        currencyId: 1,
        price: 99.99,
        unitOfMeasureId: 1,
        quantity: 10,
      },
      {
        productId: 2,
        currencyId: 1,
        price: 199.99,
        unitOfMeasureId: 1,
        quantity: 5,
      },
      {
        productId: 3,
        currencyId: 1,
        price: 9.99,
        unitOfMeasureId: 1,
        quantity: 500,
      },
      {
        productId: 4,
        currencyId: 1,
        price: 29.99,
        unitOfMeasureId: 1,
        quantity: 100,
      },
      {
        productId: 5,
        currencyId: 1,
        price: 299.99,
        unitOfMeasureId: 1,
        quantity: 50,
      },
      {
        productId: 6,
        currencyId: 1,
        price: 499.99,
        unitOfMeasureId: 1,
        quantity: 1000,
      },
      {
        productId: 7,
        currencyId: 1,
        price: 19.99,
        unitOfMeasureId: 1,
        quantity: 10,
      },
      {
        productId: 8,
        currencyId: 1,
        price: 9.99,
        unitOfMeasureId: 1,
        quantity: 5,
      },
      {
        productId: 9,
        currencyId: 1,
        price: 29.99,
        unitOfMeasureId: 1,
        quantity: 5,
      },
      {
        productId: 10,
        currencyId: 1,
        price: 199.99,
        unitOfMeasureId: 1,
        quantity: 1,
      },
      {
        productId: 11,
        currencyId: 1,
        price: 99.99,
        unitOfMeasureId: 1,
        quantity: 10,
      },
      {
        productId: 12,
        currencyId: 1,
        price: 9.99,
        unitOfMeasureId: 1,
        quantity: 5,
      },
      {
        productId: 13,
        currencyId: 1,
        price: 999.99,
        unitOfMeasureId: 1,
        quantity: 500,
      },

      {
        productId: 14,
        currencyId: 1,
        price: 50.99,
        unitOfMeasureId: 1,
        quantity: 340,
      },

      {
        productId: 15,
        currencyId: 1,
        price: 549.99,
        unitOfMeasureId: 1,
        quantity: 20,
      },
      {
        productId: 16,
        currencyId: 1,
        price: 999,
        unitOfMeasureId: 1,
        quantity: 5,
      },

      {
        productId: 17,
        currencyId: 1,
        price: 999,
        unitOfMeasureId: 1,
        quantity: 20,
      },
    ])
  }
}
