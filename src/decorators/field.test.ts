import 'reflect-metadata'
import { primaryKeyMetaKey } from '../meta'

import { Field, getFieldMeta } from './field'

describe(`field`, () => {
  test(`can save metadata`, () => {
    class Test {
      @Field()
      test!: string
    }
    const meta = getFieldMeta(Test)
    expect(meta).toHaveProperty(`test`)
  })
  describe(`type`, () => {
    test(`can deduce type by default`, () => {
      class Test {
        @Field()
        str!: string
        @Field()
        num!: number
        @Field()
        bool!: boolean
        @Field()
        date!: Date
        @Field()
        obj!: any
      }
      const meta = getFieldMeta(Test)
      expect(meta.str.type).toEqual(`string`)
      expect(meta.num.type).toEqual(`number`)
      expect(meta.bool.type).toEqual(`boolean`)
      expect(meta.date.type).toEqual(`date-time`)
      expect(meta.obj.type).toEqual(`object`)
    })
    test(`can overwrite type`, () => {
      class Test {
        @Field({ type: `number` })
        num!: string
      }
      const meta = getFieldMeta(Test)
      expect(meta.num.type).toEqual(`number`)
    })
  })
  test(`primary key`, () => {
    class Test {
      @Field({ primaryKey: true })
      id!: number
    }
    expect(Reflect.getMetadata(primaryKeyMetaKey, Test)).toEqual(`id`)
    class TestNoKey {
      @Field()
      id!: number
    }
    expect(Reflect.getMetadata(primaryKeyMetaKey, TestNoKey)).toBeUndefined()
  })
})
