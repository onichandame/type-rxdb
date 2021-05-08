import { RxCollectionCreatorBase } from '../types'

const GlobalStore = new Map<Object, RxCollectionCreatorBase>()

export const getOrThrowStore = (prototype: Object) => {
  const result = GlobalStore.get(prototype)
  if (!result) throw new Error(`store not found`)
  return result
}

export const getOrCreateStore = (prototype: Object) => {
  let result = GlobalStore.get(prototype)
  if (!result)
    GlobalStore.set(prototype, {
      schema: { type: `object`, version: 0, properties: {} },
      methods: {},
      statics: {},
    })
  result = GlobalStore.get(prototype)
  if (!result) throw new Error(`failed to store collection info`)
  return result
}
