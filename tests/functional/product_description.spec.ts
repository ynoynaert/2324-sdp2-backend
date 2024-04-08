import ProductDescription from '#models/products/product_description'
import Supplier from '#models/supplier'
import Client from '#models/client'
import { test } from '@japa/runner'
import Product from '#models/products/product'
import Account from '#models/account'

test.group('Product description', () => {
  const url: string = '/api/productdescriptions'

  test('should 200 and return a productdescription', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const response = await client.get(`${url}/${desc!.id}`)
    response.assertStatus(200)
  })

  test('should 200 and create a productdescription for a supplier', async ({ client }) => {
    const supplier = await Supplier.first()
    const product = await Product.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 1,
      productId: product!.id,
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(200)
  })

  test('should 200 and create a productdescription for a admin', async ({ client }) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const product = await Product.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(adminAccount!).json({
      languageId: 1,
      productId: product!.id,
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(200)
  })

  test('should 401 and not create a productdescription for a client', async ({ client }) => {
    //@ts-ignore^
    const clientQ = await Client.first()
    const response = await client.post(url).withGuard('client').loginAs(clientQ!).json({
      languageId: 6,
      productId: 1,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(401)
  })

  test('should 422 and not create a productdescription for non-existing language', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 100,
      productId: 1,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for non-existing product', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 6,
      productId: 10000,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for missing product', async ({ client }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 6,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for missing language', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      productId: 1,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for missing lister description', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 6,
      productId: 1,
      name: 'Test',
      shortDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for missing short description', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 6,
      productId: 1,
      name: 'Test',
      listerDescription: 'Test',
      longDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a productdescription for missing long description', async ({
    client,
  }) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier).json({
      languageId: 6,
      productId: 1,
      name: 'Test',
      listerDescription: 'Test',
      shortDescription: 'Test',
    })
    response.assertStatus(422)
  })

  test('should 200 and update a productdescription for a supplier', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const product = await Product.first()
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client
      .put(`${url}/${desc!.id}`)
      .withGuard('supplier')
      .loginAs(supplier!)
      .json({
        languageId: 1,
        productId: product!.id,
        listerDescription: 'Test',
        shortDescription: 'Test',
        longDescription: 'Test',
      })
    response.assertStatus(200)
  })

  test('should 200 and update a productdescription for a admin', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    const product = await Product.first()
    //@ts-ignore
    const response = await client
      .put(`${url}/${desc!.id}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
      .json({
        languageId: 1,
        productId: product!.id,
        listerDescription: 'Test',
        shortDescription: 'Test',
        longDescription: 'Test',
      })
    response.assertStatus(200)
  })

  test('should 401 and not update a productdescription for a client', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    //@ts-ignore
    const clientQ = await Client.first()
    const response = await client
      .put(`${url}/${desc!.id}`)
      .withGuard('client')
      .loginAs(clientQ!)
      .json({
        languageId: 6,
        productId: 1,
        name: 'Test',
        listerDescription: 'Test',
        shortDescription: 'Test',
        longDescription: 'Test',
      })
    response.assertStatus(401)
  })

  test('should 204 and delete a productdescription for a supplier', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client
      .delete(`${url}/${desc!.id}`)
      .withGuard('supplier')
      .loginAs(supplier!)
    response.assertStatus(204)
  })

  test('should 204 and delete a productdescription for a admin', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client
      .delete(`${url}/${desc!.id}`)
      .withGuard('admin')
      .loginAs(adminAccount!)
    response.assertStatus(204)
  })

  test('should 401 and not delete a productdescription for a client', async ({ client }) => {
    const desc = await ProductDescription.query().first()
    const clientQ = await Client.first()
    const response = await client.delete(`${url}/${desc!.id}`).withGuard('client').loginAs(clientQ!)
    response.assertStatus(401)
  })
})
