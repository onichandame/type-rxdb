import { RxDatabase, RxCollection } from 'rxdb'

import { getOrThrowStore } from '../store'
import { ExtractProps, ExtractMethods } from '../types'

export const getCollectionForClass = async <T>(
  cls: Function,
  db: RxDatabase
) => {
  const name = cls.name.toLowerCase()
  if (!db[name]) {
    const store = getOrThrowStore(cls.prototype)
    const args: Parameters<typeof db['addCollections']>[0] = {}
    args[name] = store
    ;(await db.addCollections(args))[name]
  }
  return db[name] as RxCollection<ExtractProps<T>, ExtractMethods<T>>
}
