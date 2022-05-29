import 'reflect-metadata'

import { Collection, Field, Index } from '../decorators'
import { getCollectionForClass } from './getCollectionForClass'

describe(`getCollectionForClass`, () => {
  test(`can get collection`, () => {
    @Collection({ version: 0, name: `test` })
    @Index([`id`, `uuid`])
    class Test {
      @Field({ primaryKey: true })
      @Index()
      id!: string
      @Field()
      uuid!: string
      test() {}
    }
    const collection = getCollectionForClass(Test)
    expect(collection.schema.primaryKey).toEqual(`id`)
    expect(collection.schema.properties.id).toEqual({ type: `string` })
    expect(collection.schema.version).toEqual(0)
    expect(collection.schema.indexes).toEqual([`id`, [`id`, `uuid`]])
  })

  test(`can get collection from inherited class`, () => {
    @Collection({ version: 0, name: `base` })
    class Base {
      @Field({ primaryKey: true })
      id!: string
      static hi() {}
      hi() {}
    }
    class Test extends Base {}
    const collection = getCollectionForClass(Test)
    expect(collection.schema.primaryKey).toEqual(`id`)
    expect(collection.schema.properties.id).toEqual({ type: `string` })
    expect(collection.schema.version).toEqual(0)
    expect(collection.statics?.hi).toEqual(Base.hi)
    expect(collection.methods?.hi).toEqual(Base.prototype.hi)
  })

  test(`can override from inherited class`, () => {
    @Collection({ version: 0, name: `base` })
    class Base {
      @Field({ primaryKey: true })
      id!: string
    }
    @Collection({ version: 1, name: `test` })
    class Test extends Base {}
    const collection = getCollectionForClass(Test)
    expect(collection.schema.version).toEqual(1)
  })
})
