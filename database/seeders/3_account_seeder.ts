// import { AccountFactory } from '#database/factories/account_factory'
import Account from '#models/account'
import Client from '#models/client'
import Supplier from '#models/supplier'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await new Account()
      .fill({
        firstname: 'Admin',
        lastname: 'delaware',
        email: 'admin@delaware.com',
        vatNumber: 'BE123456',
        country: 'BE',
        password: 'Password',
        streetNr: "14",
        city: 'Gent',
        street: 'example street',
        isAdmin: true,
        name: 'Delaware',
      })
      .save()

    //start auroratech
    const account = await new Account().fill({
      name: 'AuroraTech',
      firstname: 'Anke',
      lastname: 'Hazen',
      vatNumber: 'BE1234567',
      country: 'BE',
      password: 'Password',
      imageUrl: 'https://i.imgur.com/KKZizZr.png',
      zipcode: '9300',
      street: 'Arbeidstraat',
      city: 'Aalst',
      streetNr: "13",
      sector: 'IT',
    })
    await account.save()

    const suppie = await new Supplier().fill({
      accountId: account.id,
      firstname: 'Anke',
      lastname: 'Hazen',
      phoneNumber: '0495/12.34.56',
      email: 'account@supplier.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await suppie.save()

    const clie = await new Client().fill({
      accountId: account.id,
      firstname: 'Anke',
      lastname: 'Hazen',
      phoneNumber: '0495/12.34.56',
      email: 'account@client.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await clie.save()
    //end auroratech

    //start Nihility

    const account2 = await new Account().fill({
      name: 'Nihility',
      city: 'Dilbeek',
      streetNr: "13",
      vatNumber: 'BE12345678',
      country: 'BE',
      password: 'Password',
      imageUrl: 'https://i.imgur.com/iI5gPtL.png',
      zipcode: '1700',
      street: 'Dansaert',
      sector: 'Cleaning Services',
    })
    await account2.save()

    const supplierNihility = await new Supplier().fill({
      accountId: account2.id,
      firstname: 'Lorenzo',
      lastname: 'Hanssens',
      phoneNumber: '0494/12.34.56',
      email: 'supplier@nihility.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await supplierNihility.save()

    const clientNihility = await new Client().fill({
      accountId: account2.id,
      firstname: 'Niels',
      lastname: 'Nihility',
      phoneNumber: '0492/12.34.56',
      email: 'client@nihility.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await clientNihility.save()
    //end nihility

    // start bpost
    const bpostAccount = await new Account().fill({
      name: 'Bpost',
      city: 'Brussels',
      streetNr: "12",
      vatNumber: 'BE122323',
      country: 'BE',
      password: 'Password',
      imageUrl: 'https://www.adshot.io/wp-content/uploads/2023/03/bpost-logo.png',
      zipcode: '1080',
      street: 'CURL POST',
      sector: 'Post',
    })
    await bpostAccount.save()

    const bpostSupplier = await new Supplier().fill({
      accountId: bpostAccount.id,
      firstname: 'André',
      lastname: 'Lavandier',
      phoneNumber: '0494/12.33.56',
      email: 'supplier@bpost.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await bpostSupplier.save()

    const bpostClient = await new Client().fill({
      accountId: bpostAccount.id,
      firstname: 'Alexi',
      lastname: '',
      phoneNumber: '0492/12.34.56',
      email: 'client@bpost.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await bpostClient.save()
    //end bpost

    //start boeing

    const account3 = await new Account().fill({
      name: 'Boeing',
      city: 'Texas',
      streetNr: "31",
      vatNumber: 'BE09876543',
      country: 'US',
      imageUrl: 'https://live.staticflickr.com/7277/7651088336_1c8cf7d664_w.jpg',
      zipcode: '20301',
      street: ' Long Bridge Drive',
      sector: 'Aerospace',
    })
    await account3.save()

    const supplierBoeing = await new Supplier().fill({
      accountId: account3.id,
      firstname: 'Dave',
      lastname: 'Calhoun',
      phoneNumber: '100192046',
      email: 'supplier@boeing.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await supplierBoeing.save()

    const clientBoeing = await new Client().fill({
      accountId: account3.id,
      firstname: 'Casper',
      lastname: 'Boo',
      phoneNumber: '1234-392-12-34-56',
      email: 'client@boeing.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await clientBoeing.save()
    //end boeing

    //start Barco

    const accountBarco = await new Account().fill({
      name: 'Barco',

      vatNumber: 'BE0473191041',
      country: 'BE',
      imageUrl:
        'https://assets.barco.com/transform/618c2441-7bad-48cf-97e1-dbc2c07e825a/barco-web-logo',
      zipcode: '8500',
      street: 'President Kennedypark',
      sector: 'Technology',
      city: 'Kortrijk',
      streetNr: "132",
    })
    await accountBarco.save()

    const supplierBarco = await new Supplier().fill({
      accountId: accountBarco.id,
      firstname: 'An',
      lastname: 'Steegen',
      phoneNumber: '100/192.046',
      email: 'supplier@barco.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await supplierBarco.save()

    const clientBarco = await new Client().fill({
      accountId: accountBarco.id,
      firstname: 'Charles',
      lastname: 'Beauduin',
      phoneNumber: '124/392.1234.56',
      email: 'client@barco.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await clientBarco.save()
    //end boeing
  }
}
