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
  return {
    schema: {
      ...collectionMeta,
      primaryKey,
      type: `object`,
      properties: fieldMeta,
      indexes: indices,
    },
    methods: new cls() as any,
    statics: cls as any,
  }
}
