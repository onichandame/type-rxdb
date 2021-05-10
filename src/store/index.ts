import { RxCollectionCreatorBase } from '../types'

const GlobalStore = new Map<Object, RxCollectionCreatorBase>()

export const getStore = (prototype: Object) => {
  const result = GlobalStore.get(prototype)
  return result
}

export const getOrCreateStore = (prototype: Object) => {
  let result = getStore(prototype)
  if (!result)
    GlobalStore.set(prototype, {
      schema: { type: `object`, version: 0, properties: {} },
      methods: {},
      statics: {},
    })
  result = getStore(prototype)
  if (!result) throw new Error(`failed to store collection info`)
  return result
}
