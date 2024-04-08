import vine from '@vinejs/vine'

// Wachtwoord komt aan als plain string! Niet vergeten te HASHEN!
export const signUpValidator = vine.compile(
  vine.object({
    name: vine.string(),
    image_url: vine.string().url().optional(),
    vat_number: vine.string(),
    country: vine.string(),
    zipcode: vine.string(),
    street: vine.string(),
    streetNr: vine.string(),
    city: vine.string(),
    sector: vine.string(), //todo sector ID etc...
    supplierEmail: vine.string().email(),
    supplierFirstname: vine.string(),
    supplierLastname: vine.string(),
    supplierPassword: vine.string().minLength(8).maxLength(30),
    supplierPhone: vine.string(),
    clientEmail: vine.string().email(),
    clientFirstname: vine.string(),
    clientLastname: vine.string(),
    clientPassword: vine.string().minLength(8).maxLength(30),
    clientPhone: vine.string(),
  })
)
