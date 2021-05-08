import 'reflect-metadata'

import { getOrCreateStore } from '../store'
import { RxJsonSchema } from '../types'

type Args = Omit<RxJsonSchema, 'properties' | 'attachments'>

export const Collection = (args: Args) => {
  return (constructor => {
    const store = getOrCreateStore(constructor.prototype)
    Object.assign(store.schema, args)
  }) as ClassDecorator
}
