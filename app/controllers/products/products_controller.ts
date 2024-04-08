import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/products/product'
import ProductPolicy from '#policies/product_policy'
import { createProductValidator } from '#validators/product'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ logger, response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('max', 12)
    const filterName = request.input('name', '%')
    const filterCategory = request.input('category')
    const filterMinPrice = request.input('minPrice', 0)
    const filterMaxPrice = request.input('maxPrice', 1000)
    const filterSupplier = request.input('supplier')
    const filterAvailable = request.input('product_availability')
    const orderByRequest = request.input('orderBy', 'id')
    const orderByOrder = request.input('order', 'asc')

    const query = Product.query()
      .select('*')
      .preload('category')
      .preload('productPrice')
      .preload('productDescription')
      .preload('supplier')
      .where('name', 'LIKE', `%${filterName == '%' ? '' : filterName}%`)
      .where((builder) => {
        if (filterAvailable !== undefined) {
          builder.where('product_availability', filterAvailable)
        }
      })
      .whereHas('category', (builder) => {
        if (filterCategory) {
          builder.where('id', '=', filterCategory)
        }
      })
      .whereHas('productPrice', (builder2) => {
        builder2.whereBetween('price', [filterMinPrice, filterMaxPrice])
      })
      .whereHas('supplier', (builder3) => {
        if (filterSupplier) {
          builder3.where('supplier_id', '=', filterSupplier)
        }
      })

    if (orderByRequest === 'price') {
      //@ts-ignore
      query.orderBy((buil) => {
        //@ts-ignore
        buil
          .select('price')
          .from('product_prices')
          .whereColumn('product_id', 'products.id')
          .orderBy(orderByRequest, orderByOrder)
      }, orderByOrder)
    } else {
      query.orderBy(orderByRequest, orderByOrder)
    }

    const products = await query.paginate(page, limit)
    const productsJSON = products.serialize().data
    const paginationMeta = products.toJSON().meta
    logger.info('Fetching all products')
    return response.status(200).json({ products: productsJSON, meta: paginationMeta })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ logger, request, bouncer, response }: HttpContext) {
    // @ts-ignore
    if (await bouncer.with(ProductPolicy).denies('create')) {
      logger.info('User tried to create a product without permission')
      response.status(403).json('Oopsie!')
    } else {
      //Ter info, als dit faalt, gaat de rest niet door.
      const payload = await request.validateUsing(createProductValidator)
      // account aanmaken & persisten naar database
      // @ts-ignore
      const product = await Product.create(payload)
      // emitter.emit('product:created', product)
      logger.info('Product created')
      response.status(200).json('Done!')
    }
  }

  /**
   * Show individual record
   */
  async show({ logger, params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.load('productPrice')
    await product.load('productDescription')
    await product.load('category')
    await product.load('supplier', (query) => {
      // Specify the columns you want to select from the 'supplier' table
      query.select('account_id')
      query.preload('account', (accBuilder) => {
        accBuilder.select('name')
      })
    })
    logger.info('Fetching product %s', product.id)
    response.status(200).json(product.toJSON())
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ logger, params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const payload = await request.validateUsing(createProductValidator)
    product.merge(payload)
    await product.save()
    logger.info('Product updated')
    return response.status(204)
  }

  /**
   * Delete record
   */
  async destroy({ logger, params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    logger.info('Product %s deleted', product.id)
    return response.status(204)
  }
}
