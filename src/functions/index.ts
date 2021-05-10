import { RxDatabase, RxCollection } from 'rxdb'
import merge from 'lodash.merge'

import { getStore } from '../store'
import { ExtractProps, ExtractMethods } from '../types'

export const getCollectionForClass = async <T>(
  cls: Function,
  db: RxDatabase
) => {
  const name = cls.name.toLowerCase()
  if (!db[name]) {
    const args: Parameters<typeof db['addCollections']>[0] = {}
    let store = getStore(cls.prototype)
    while (store) {
      merge(args[name], store)
      store = getStore(Object.getPrototypeOf(cls.prototype))
    }
    await db.addCollections(args)
    console.log(`collected`)
  }
  return db[name] as RxCollection<ExtractProps<T>, ExtractMethods<T>>
}
