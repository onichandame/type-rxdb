import { RxCollectionCreator } from 'rxdb'

import {
  collectionMetaKey,
  fieldMetaKey,
  indexMetaKey,
  primaryKeyMetaKey,
} from '../meta'
import { Class } from '../types'

export const getCollectionForClass = <T>(
  cls: Class<T>
): RxCollectionCreator => {
  const collectionMeta = Reflect.getMetadata(collectionMetaKey, cls)
  if (!collectionMeta)
    throw new Error(
      `the class seems not to be defined as a collection. consider adding @Collection()`
    )
  const fieldMeta = Reflect.getMetadata(fieldMetaKey, cls)
  const primaryKey = Reflect.getMetadata(primaryKeyMetaKey, cls)
  const indices = Reflect.getMetadata(indexMetaKey, cls)
  if (!primaryKey)
    throw new Error(`Must define a primary key for collection ${cls.name}`)
  const instanceMethods = getMethods(cls.prototype).reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr }),
    {} as any
  )
  const staticMethods = getMethods(cls).reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr }),
    {} as any
  )
  return {
    schema: {
      ...collectionMeta,
      primaryKey,
      type: `object`,
      properties: fieldMeta,
      indexes: indices,
    },
    methods: instanceMethods,
    statics: staticMethods,
  }
}

function getMethods(obj: any) {
  class Dummy {}
  if (
    obj === Object.getPrototypeOf(Dummy) ||
    obj === Object.getPrototypeOf(Dummy.prototype)
  )
    return []
  const methods = Object.getOwnPropertyNames(obj)
    .filter(v => v !== `constructor`)
    .map(v => obj[v])
    .filter(v => typeof v === `function`)
  const parent = Object.getPrototypeOf(obj)
  if (parent) methods.push(...getMethods(parent))
  return methods
}
