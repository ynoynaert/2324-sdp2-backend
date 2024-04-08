import Product from '#models/products/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Chair',
        unitOfMeasureId: 1,
        categoryId: 1,
        productAvailability: true,
        supplierId: 1,
        imageUrl:
          'https://www.gerowonen.be/media/39/25/df/1645550042/621519dac8c2b-V015-EVE-1018%20(2).png.png',
      },
      {
        name: 'Desk',
        unitOfMeasureId: 1,
        categoryId: 1,
        productAvailability: true,
        supplierId: 1,
        imageUrl:
          'https://www.sosjm.com/images/thumbs/0000798_ht-mdk189-be-hitop-1800-x-1800-executive-desk-unit-bedg.png',
      },
      {
        name: 'Copy Paper',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: false,
        supplierId: 1,
        imageUrl: 'https://www.paperone.com/images/aprilhwm/aprilhwm_hero.png',
      },
      {
        name: 'Ink',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: false,
        supplierId: 1,
        imageUrl: 'https://m.media-amazon.com/images/I/61i8EqTrroL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        name: 'Printer',
        unitOfMeasureId: 1,
        categoryId: 3,
        productAvailability: false,
        supplierId: 1,
        imageUrl:
          'https://www.canon.ca/dam/products/BUSINESS-UNIT/BICG/DX-Model-Images/C3700i_MainUnit.png',
      },
      {
        name: 'Microsoft Office 365 ProPlus',
        unitOfMeasureId: 1,
        categoryId: 4,
        productAvailability: true,
        supplierId: 1,
        imageUrl:
          'https://pcdokterhasselt.be/wp-content/uploads/2022/10/1597736812780-png-500x500-1.png',
      },
      {
        name: 'Desk Organizer',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl: 'https://img.fruugo.com/product/4/84/307998844_max.jpg',
      },
      {
        name: 'Stapler',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl:
          'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_535,q_auto,w_950/c_pad,h_535,w_950/Y1778720-01?pgw=1&pgwact=1',
      },
      {
        name: 'Pencil',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl:
          'https://i.etsystatic.com/17933026/r/il/f3afa1/2010589648/il_1080xN.2010589648_4trc.jpg',
      },
      {
        name: 'Pen',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl:
          'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8NTAwODh8aW1hZ2UvcG5nfGg5Yy9oZjMvMTQ0NDg0NDUxNjE1MDIucG5nfDVkZWQ2ODI1NDIwNzNlYmY4ZjNhNmUyNGVlZTRmZmNiZDY2N2UxZTNlMmNkOGU0ZWMwODczMjkwNjBjODA2MWY/GX81J19850-560x450-01.png',
      },
      {
        name: 'Notebook',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/71vrP7GOBLL.jpg',
      },
      {
        name: 'Calculator',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/71mL4boUKwL._AC_UF894,1000_QL80_.jpg',
      },
      {
        name: 'Whiteboard',
        unitOfMeasureId: 1,
        categoryId: 1,
        productAvailability: true,
        supplierId: 1,
        imageUrl:
          'https://whiteboard-flipover.nl/img/__c82DpVH0rHRztrR13KMaKAPHQMmBDu2Dehos4kKi0/resize:fit:700:700/aHR0cHM6Ly93aGl0ZWJvYXJkLWZsaXBvdmVyLm5sL21lZGlhL2NhdGFsb2cvcHJvZHVjdC9mL3IvZnJvbnQtYmxhY2suanBnP3dpZHRoPTcwMCZoZWlnaHQ9NzAwJnN0b3JlPXdoaXRlYm9hcmRfZmxpcG92ZXJfbmwmaW1hZ2UtdHlwZT1pbWFnZQ.jpg',
      },
      {
        name: 'Exxon Aviation Oil Elite',
        unitOfMeasureId: 1,
        categoryId: 2,
        productAvailability: true,
        supplierId: 4,
        imageUrl: 'https://shop.boeing.com/content-images/ELITE20W50QT=3Z_280.JPG',
      },
      {
        name: 'Stratus Heli',
        unitOfMeasureId: 1,
        categoryId: 3,
        productAvailability: true,
        supplierId: 4,
        imageUrl: 'https://www.aviall.com/content-images/PRD000220000=54_280.JPG',
      },
      {
        name: 'Nio Color 2MP (MDNC-2521)',
        unitOfMeasureId: 1,
        categoryId: 3,
        productAvailability: true,
        supplierId: 5,
        imageUrl:
          'https://assets.barco.com/transform/3cf289c0-a516-41ab-9c9c-856584a15d16/MDNC-x521-front-no-cover-ColorCT-onwhite_preview-jpg.jpg',
      },
      {
        name: 'F400-4K Projector',
        unitOfMeasureId: 1,
        categoryId: 3,
        productAvailability: true,
        supplierId: 5,
        imageUrl:
          'https://assets.barco.com/transform/5e0851e4-14e4-4acc-8cc6-889907c3f04e/F400-HR-004.png',
      },
    ])
  }
}
