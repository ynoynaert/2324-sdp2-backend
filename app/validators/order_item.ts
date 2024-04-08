  import vine from '@vinejs/vine'
  import { exists } from './helpers/db.js';


  export const createOrderItemValidator = vine.compile(
    vine.object({
      order_uuid: vine.string().exists(exists('orders', 'uuid')),
      product_id: vine.number().positive().exists(exists('products', 'id')),
      quantity: vine.number().positive().withoutDecimals(),
      unit_of_measure_id: vine.number().positive(),
      net_amount: vine.number().positive(),
    })
  )
