import { RxJsonSchema } from 'rxdb'

import { collectionMetaKey, collectionNameMetaKey } from '../meta'

export const Collection = <T = {}>({ name, ...args }: CollectionOpts<T>) => {
  return (constructor => {
    Reflect.defineMetadata(collectionNameMetaKey, name, constructor)
    Reflect.defineMetadata(collectionMetaKey, args, constructor)
  }) as ClassDecorator
}

interface CollectionOpts<T>
  extends Omit<RxJsonSchema<T>, 'properties' | 'type' | 'primaryKey'> {
  name: string
}
