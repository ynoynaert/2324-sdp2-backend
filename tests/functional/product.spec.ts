import Account from '#models/account';
import Client from '#models/client';
import Supplier from '#models/supplier';
import { test } from '@japa/runner'

test.group('Product', () => {
  const url: string = '/api/products';

  test('should 200 and return a list of products', async ({client}) => {
    const response = await client.get(url)
    response.assertStatus(200)
  })

  test('should 200 and create a product for supplier', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 2,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(200)
  })

  test('should 422 and not create a product for non-existing categoryId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 100,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a product for missing name', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      unitOfMeasureId: 2,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a product for missing unitOfMeasureId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a product for missing categoryId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not create a product for missing productAvailability', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.post(url).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 1,
    })
    response.assertStatus(422)
  })

  test('should 200 and create a product for a admin', async ({client}) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.post(url).withGuard('admin').loginAs(adminAccount!).json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(200)
  })

  test('should 401 and not create a product for client', async ({client}) => {
    //@ts-ignore
    const response = await client.post(url).withGuard('client').loginAs(await Client.first())
    .json({
      unitOfMeasureId: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(401)
  })

  test('should 200 and return a product', async ({client}) => {
    const response = await client.get(`${url}/1`)
    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
    })
  })

  test('should 200 and update a product for supplier', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(204)
  })

  test('should 422 and not update a product for non-existing categoryId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 100,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not update a product for missing name', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      unitOfMeasureId: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not update a product for missing unitOfMeasureId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not update a product for missing categoryId', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 422 and not update a product for missing productAvailability', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
    .json({
      name: "test",
      unitOfMeasureId: 5,
      categoryId: 1,
    })
    response.assertStatus(422)
  })

  test('should 401 and not update a product for client', async ({client}) => {
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('client').loginAs(await Client.first())
    .json({
      unitOfMeasureId: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(401)
  })

  test('should 422 and not update a product for a admin', async ({client}) => {
    const adminAccount = await Account.findBy('email', 'admin@delaware.com')
    //@ts-ignore
    const response = await client.put(`${url}/1`).withGuard('admin').loginAs(adminAccount!).json({
      name: "test",
      unitOfMeasureI: 5,
      categoryId: 1,
      productAvailability: 1,
    })
    response.assertStatus(422)
  })

  test('should 200 and delete a product for supplier', async ({client}) => {
    const supplier = await Supplier.first()
    //@ts-ignore
    const response = await client.delete(`${url}/1`).withGuard('supplier').loginAs(supplier)
    response.assertStatus(204)
  })

  test('should 401 and not delete a product for client', async ({client}) => {
    //@ts-ignore
    const response = await client.delete(`${url}/1`).withGuard('client').loginAs(await Client.first())
    response.assertStatus(401)
  })
})
