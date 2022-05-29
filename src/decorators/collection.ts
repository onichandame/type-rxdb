import { MigrationStrategy, RxJsonSchema } from 'rxdb'

import {
  collectionMetaKey,
  collectionNameMetaKey,
  migrationMetaKey,
} from '../meta'

export const Collection = <T = {}>({
  name,
  migrations,
  ...args
}: CollectionOpts<T>) => {
  return (constructor => {
    Reflect.defineMetadata(collectionNameMetaKey, name, constructor)
    Reflect.defineMetadata(collectionMetaKey, args, constructor)
    if (migrations)
      Reflect.defineMetadata(migrationMetaKey, migrations, constructor)
  }) as ClassDecorator
}

interface CollectionOpts<T>
  extends Omit<RxJsonSchema<T>, 'properties' | 'type' | 'primaryKey'> {
  name: string
  migrations?: Record<number, MigrationStrategy>
}
