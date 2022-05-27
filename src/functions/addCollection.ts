import { RxDatabase } from 'rxdb'
import { HooksMeta } from '../decorators/hooks/meta'
import { collectionNameMetaKey, hooksMetaKey } from '../meta'
import { Class } from '../types'
import { getCollectionForClass } from './getCollectionForClass'

export const addCollection = async <TDb extends RxDatabase>(
  db: TDb,
  cls: Class<any>
) => {
  const name = Reflect.getMetadata(collectionNameMetaKey, cls)
  if (typeof name !== `string`)
    throw new Error(
      `collection name must be defined. consider adding @Collection({name: 'xxx'})`
    )
  const collection = getCollectionForClass(cls)
  await db.addCollections({ [name]: collection })
  const col = db[name]
  const hooks = Reflect.getMetadata(hooksMetaKey, cls)
  if (hooks instanceof HooksMeta) {
    hooks.preInserts.forEach(([fn, opts]) =>
      col?.preInsert(fn as any, !!opts.parallel)
    )
    hooks.postInserts.forEach(([fn, opts]) =>
      col?.postInsert(fn as any, !!opts.parallel)
    )
    hooks.preSaves.forEach(([fn, opts]) =>
      col?.preSave(fn as any, !!opts.parallel)
    )
    hooks.postSaves.forEach(([fn, opts]) =>
      col?.postSave(fn as any, !!opts.parallel)
    )
    hooks.preRemoves.forEach(([fn, opts]) =>
      col?.preRemove(fn as any, !!opts.parallel)
    )
    hooks.postRemoves.forEach(([fn, opts]) =>
      col?.postRemove(fn as any, !!opts.parallel)
    )
    hooks.postCreates.forEach(([fn]) => col?.postCreate(fn as any))
  }
}
