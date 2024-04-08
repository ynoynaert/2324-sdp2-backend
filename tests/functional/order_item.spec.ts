import { test } from '@japa/runner'
import Client from '#models/client';
import Supplier from '#models/supplier';
import Order from '#models/order';

test.group('OrderItem', () => {

    const url: string = '/api/orderitems';

    test('should 401 and not create an order item for supplier', async ({ client }) => {
        const supplier = await Supplier.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('supplier').loginAs(supplier)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(401)
    })

    test('should 422 and not create an order item for non-existent order', async ({ client }) => {
        const clientAcc = await Client.first()

        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 10000,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order item for non-existent product', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1000000,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when order_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when product_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when quantity is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when unit_of_measure_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when net_amount is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when net_amount is negative', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": -740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not create an order when quantity is negative', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.post(url).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": -1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })


    test('should 404 when gettting a non-existent order item', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.get(`${url}/1000000`).withGuard('client').loginAs(clientAcc)

        response.assertStatus(404)
    })

    // update tests
    test('should 200 and update an order item for client', async ({ client }) => {
        const clientAcc = await Client.first()
        const order = await Order.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_uuid" : order?.uuid,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(200)
    })

    test('should 401 and not update an order item for supplier', async ({ client }) => {
        const supplier = await Supplier.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('supplier').loginAs(supplier)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(401)
    })

    test('should 404 and not update a non-existent order item', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1000000`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(404)
    })

    test('should 422 and not update a non-existent order', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1000000,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update a non-existent product', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1000000,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when order_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when product_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when quantity is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when unit_of_measure_id is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when net_amount is missing', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when net_amount is negative', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": 1,
                "unit_of_measure_id": 1,
                "net_amount": -740.25
            })
        response.assertStatus(422)
    })

    test('should 422 and not update an order when quantity is negative', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.put(`${url}/1`).withGuard('client').loginAs(clientAcc)
            .json({
                "order_id": 1,
                "product_id": 1,
                "quantity": -1,
                "unit_of_measure_id": 1,
                "net_amount": 740.25
            })
        response.assertStatus(422)
    })

    // destroy tests
    test('should 200 and delete an order item for client', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.delete(`${url}/1`).withGuard('client').loginAs(clientAcc)
        response.assertStatus(200)
    })

    test('should 401 and not delete an order item for supplier', async ({ client }) => {
        const supplier = await Supplier.first()
        // @ts-ignore
        const response = await client.delete(`${url}/1`).withGuard('supplier').loginAs(supplier)
        response.assertStatus(401)
    })

    test('should 404 and not delete a non-existent order item', async ({ client }) => {
        const clientAcc = await Client.first()
        // @ts-ignore
        const response = await client.delete(`${url}/1000000`).withGuard('client').loginAs(clientAcc)
        response.assertStatus(404)
    })
})
