import 'reflect-metadata'

import { getOrCreateStore } from '../store'
import { guardKeyType } from '../utils'

export const Method = () => {
  return ((prototype, key, descriptor: TypedPropertyDescriptor<Function>) => {
    if (guardKeyType(key)) {
      if (!descriptor.value || !(typeof descriptor.value !== `function`))
        throw new Error(`not function!`)
      const store = getOrCreateStore(prototype)
      store.methods && (store.methods[key] = descriptor.value)
    }
  }) as MethodDecorator
}
