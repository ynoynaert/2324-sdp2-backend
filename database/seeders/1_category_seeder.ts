// import { CategoryFactory } from '#database/factories/category_factory'
import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await new Category() // categoryID 1
      .fill({
        name: 'Office furniture',
      })
      .save()

    await new Category() // categoryID 2
      .fill({
        name: 'Office supplies',
      })
      .save()

    await new Category() // categoryID 3
      .fill({
        name: 'Office electronics',
      })
      .save()

    await new Category() // categoryID 4
      .fill({
        name: 'Office software',
      })
      .save()

    await new Category() // categoryID 5
      .fill({
        name: 'Network Gear',
      })
      .save()
    await new Category() // categoryID 6
      .fill({
        name: 'Business Essentials',
      })
      .save()

    // await CategoryFactory.createMany(10)
  }
}
