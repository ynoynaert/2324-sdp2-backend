import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'

export const createOrderValidator = vine.compile(
  vine.object({
    currency_id: vine.number().positive().exists(exists('currencies', 'id')),
    billing_address_street: vine.string().trim(),
    billing_address_street_nr: vine.string().trim(),
    billing_address_city: vine.string().trim(),
    billing_address_zipcode: vine.string().trim(),
    billing_address_country: vine.string().trim(),
    shipping_address_street: vine.string().trim(),
    shipping_address_zipcode: vine.string().trim(),
    shipping_address_country: vine.string().trim(),
    shipping_address_street_nr: vine.string().trim(),
    shipping_address_city: vine.string().trim(),

    remark: vine.string().trim().nullable(),
    vat_type: vine.string().trim(),
    payment_period: vine.string().trim(),
  })
)
