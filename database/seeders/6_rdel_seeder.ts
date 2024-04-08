import Account from '#models/account'
import Client from '#models/client'
import Product from '#models/products/product'
import ProductDescription from '#models/products/product_description'
import ProductPrice from '#models/products/product_price'
import Supplier from '#models/supplier'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const accountDell = await new Account().fill({
      name: 'Dell',
      vatNumber: 'BE0473129141',
      country: 'BE',
      imageUrl:
        'hhttps://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png',
      zipcode: '78682',
      city: 'Round Rock',
      street: 'One Dell Way',
      sector: 'Technology',
      streetNr: '12',
    })
    await accountDell.save()

    const supplierDell = await new Supplier().fill({
      accountId: accountDell.id,
      firstname: 'David',
      lastname: 'Dellano',
      phoneNumber: '800-289-3355',
      email: 'supplier@dell.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await supplierDell.save()

    const clientDell = await new Client().fill({
      accountId: accountDell.id,
      firstname: 'Michael',
      lastname: 'Dell',
      phoneNumber: '124/392.1234.56',
      email: 'client@dell.com',
      password:
        '$scrypt$n=16384,r=8,p=1$idPZqR6sCtk7R20WhdyaWQ$Bvn4Q6AQpd3zDEGlqi+ScVOZ3igKCt44PrHR1c0lS1ICA1TMBFHBbkvJTdT+TYedNJ6Z3EtYhciLvxH0aZpu+w',
    })
    await clientDell.save()

    const prod1 = await new Product()
      .fill({
        name: 'Inspiron 15 Laptop',
        unitOfMeasureId: 1,
        categoryId: 6,
        productAvailability: true,
        supplierId: supplierDell.id,
        imageUrl:
          'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/notebook-inspiron-15-3520-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=684&qlt=100,1&resMode=sharp2&size=684,402&chrss=full',
      })
      .save()
    await new ProductDescription()
      .fill({
        productId: prod1.id,
        languageId: 1,
        listerDescription:
          'Experience responsive yet quiet performance, featuring up to 12th generation Intel® Core™ processors combined with PCIe SSD options. Benefit from roomy keycaps and a spacious touchpad that makes it easier to navigate your content and ComfortView software, which is a TUV Rheinland certified solution, reduces harmful blue light emissions to keep your eyes comfortable over extended viewing times. Also, sleek three-side narrow borders encase a FHD display.',
        shortDescription:
          'Your Inspiron PC is now ready for business with military-grade testing for added reliability and an easy-to-use, built-in Trusted Platform Module to protect your data. Connect all your personal and business devices with a range of options.',
        longDescription:
          'Experience responsive yet quiet performance, featuring up to 12th generation Intel® Core™ processors combined with PCIe SSD options. Benefit from roomy keycaps and a spacious touchpad that makes it easier to navigate your content and ComfortView software, which is a TUV Rheinland certified solution, reduces harmful blue light emissions to keep your eyes comfortable over extended viewing times. Also, sleek three-side narrow borders encase a FHD display.',
      })
      .save()

    await new ProductPrice()
      .fill({
        productId: prod1.id,
        currencyId: 1,
        price: 234.99,
        unitOfMeasureId: 1,
        quantity: 100,
      })
      .save()

    const prod2 = await new Product()
      .fill({
        name: 'PowerEdge Modular System Switch',
        unitOfMeasureId: 1,
        categoryId: 5,
        productAvailability: true,
        supplierId: supplierDell.id,
        imageUrl:
          'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/mx-series/mx7000/mx7000/pdp/prod-496451-server-poweredge-mx7000-mx9116n-mx7116n-3556x2000px.png?wid=1920&hei=1580&fmt=png-alpha&qlt=100%2c0&op_usm=1.75%2c0.3%2c2%2c0&resMode=sharp2&pscan=auto&fit=constrain%2c1&align=0%2c0',
      })
      .save()
    await new ProductDescription()
      .fill({
        productId: prod2.id,
        languageId: 1,
        listerDescription:
          'Robust yet simple fabric automation that goes beyond the ordinary. Plug and Play fabric deployment with simplified I/O Aggregation providing a single pane of glass view. Physical topology validation and compliance checking. Automated per-VLAN Quality of Service assignment based on traffic types. Self-healing fabric detects misconfigurations and link failure conditions and adjusts where possible.',
        shortDescription:
          'Maximize the demanding connectivity needs of today’s data center workloads while also lowering overall costs and network management complexity.',
        longDescription:
          'Robust yet simple fabric automation that goes beyond the ordinary. Plug and Play fabric deployment with simplified I/O Aggregation providing a single pane of glass view. Physical topology validation and compliance checking. Automated per-VLAN Quality of Service assignment based on traffic types. Self-healing fabric detects misconfigurations and link failure conditions and adjusts where possible.',
      })
      .save()

    await new ProductPrice()
      .fill({
        productId: prod2.id,
        currencyId: 1,
        price: 760,
        unitOfMeasureId: 1,
        quantity: 140,
      })
      .save()

    const prod3 = await new Product()
      .fill({
        name: 'PowerSwitch Z-series Spine, Core and Aggregation Switch',
        unitOfMeasureId: 1,
        categoryId: 5,
        productAvailability: true,
        supplierId: supplierDell.id,
        imageUrl:
          'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/networking-products/dell/z-series/z9664f/media-gallery/networking-powerswitch-z9664f-on-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&hei=402&wid=992&qlt=100,1&resMode=sharp2&size=992,402&chrss=full',
      })
      .save()
    await new ProductDescription()
      .fill({
        productId: prod3.id,
        languageId: 1,
        listerDescription:
          "Our open networking vision embraces massive scalability along with added agility in open, disaggregated solutions. Pick and choose the hardware, software, and network operating software (and components) that best fit your requirements within your data center and at the edge. At the same time, take advantage of automation and innovative management tools and other key integrations that streamline and simplify your experience with open networking technology. Dell PowerSwitch Z-series provides optimal flexibility, high performance, density and power efficiency for today's demanding workloads while providing headroom for future data center demands.",
        shortDescription:
          'Optimize performance for today’s applications with multi-rate, flexible solutions supporting a range of 10GbE to 400GbE throughput.',
        longDescription:
          "Our open networking vision embraces massive scalability along with added agility in open, disaggregated solutions. Pick and choose the hardware, software, and network operating software (and components) that best fit your requirements within your data center and at the edge. At the same time, take advantage of automation and innovative management tools and other key integrations that streamline and simplify your experience with open networking technology. Dell PowerSwitch Z-series provides optimal flexibility, high performance, density and power efficiency for today's demanding workloads while providing headroom for future data center demands.",
      })
      .save()

    await new ProductPrice()
      .fill({
        productId: prod3.id,
        currencyId: 1,
        price: 100.73,
        unitOfMeasureId: 1,
        quantity: 14,
      })
      .save()
  }
}
