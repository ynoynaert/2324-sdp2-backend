import Supplier from '#models/supplier'
import Client from '#models/client'
import { test } from '@japa/runner'
import Product from '#models/products/product'

test.group('Productprices', () => {
  const url: string = '/api/productprices'

  test('should 200 and return a productprice', async ({ client }) => {
    const response = await client.get(`${url}/4`)
    response.assertStatus(200)
  })

  test('should 200 and create a productprice for supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 1,
      currencyId: 1,
      price: 100,
      unitOfMeasureId: 1,
      quantity: 1,
    })
    response.assertStatus(200)
  })

  test('should 401 and not create a productprice for client', async ({ client }) => {
    //@ts-ignore
    const response = await client
      .post(url)
      .withGuard('client')
      .loginAs(await Client.first())
      .json({
        productId: 1,
        currencyId: 1,
        price: 100,
        unitOfMeasureId: 1,
        quantity: 1,
      })
    response.assertStatus(401)
  })

  test('should 422 and not create an productprice for non-existing currency', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 100,
      currencyId: 20,
      price: 100,
      unitOfMeasureId: 1,
      quantity: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create an productprice for negative unit of measure', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 1,
      currencyId: 1,
      price: 100,
      unitOfMeasureId: -20,
      quantity: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create an productprice for negative price', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 1,
      currencyId: 1,
      price: -100,
      unitOfMeasureId: 1,
      quantity: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create an productprice for negative quantity', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 1,
      currencyId: 1,
      price: 100,
      unitOfMeasureId: 1,
      quantity: -1,
    })
    response.assertStatus(422)
  })

  test('should 200 and update a productprice for supplier', async ({ client }) => {
    const product = await Product.first()
    await product!.load('supplier')
    await product!.load('productPrice')

    const supplier = product?.supplier
    const productprice = product!.productPrice
    const productPriceId = productprice[0].id

    //@ts-ignore
    const response = await client
      .put(`${url}/${productPriceId}`)
      .withGuard('supplier')
      .loginAs(supplier)
      .json({
        currencyId: 2,
        price: 65.0,
        unitOfMeasureId: 65,
        quantity: 65,
      })

    response.assertStatus(200)
  })

  test('should 401 and not update a productprice for client', async ({ client }) => {
    //@ts-ignore
    const response = await client
      .put(`${url}/1`)
      .withGuard('client')
      .loginAs(await Client.first())
      .json({
        productId: 1,
        currencyId: 1,
        price: 100,
        unitOfMeasureId: 1,
        quantity: 1,
      })
    response.assertStatus(401)
  })

  test('should 404 and not update a productprice for non-existing currency', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier).json({
      currencyId: 20,
      price: 100,
      unitOfMeasureId: 1,
      quantity: 1,
    })
    response.assertStatus(404)
  })

  test('should 404 and not update a productprice for negative unit of measure', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier).json({
      currencyId: 1,
      price: 100,
      unitOfMeasureId: -20,
      quantity: 1,
    })
    response.assertStatus(404)
  })

  test('should 404 and not update a productprice for negative price', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier).json({
      currencyId: 1,
      price: -100,
      unitOfMeasureId: 1,
      quantity: 1,
    })
    response.assertStatus(404)
  })

  test('should 404 and not update a productprice for negative quantity', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier).json({
      currencyId: 1,
      price: 100,
      unitOfMeasureId: 1,
      quantity: -1,
    })
    response.assertStatus(404)
  })

  test('should 204 and delete a productprice for supplier', async ({ client }) => {
    const product = await Product.first()
    await product!.load('supplier')
    await product!.load('productPrice')

    const supplier = product?.supplier
    const productprice = product!.productPrice
    const productPriceId = productprice[0].id

    //@ts-ignore
    const response = await client
      .delete(`${url}/${productPriceId}`)
      .withGuard('supplier')
      .loginAs(supplier)
    response.assertStatus(204)
  })

  test('should 401 and not delete a productprice for client', async ({ client }) => {
    //@ts-ignore
    const response = await client
      .delete(`${url}/1`)
      .withGuard('client')
      .loginAs(await Client.first())
    response.assertStatus(401)
  })
})
