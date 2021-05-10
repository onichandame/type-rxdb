import 'reflect-metadata'
import merge from 'lodash.merge'

import { getOrCreateStore } from '../store'
import { RxJsonSchema } from '../types'

type Args = Omit<RxJsonSchema, 'properties' | 'attachments'>

export const Collection = (args: Args) => {
  return (constructor => {
    const store = getOrCreateStore(constructor.prototype)
    store.schema = merge(store.schema, args)
  }) as ClassDecorator
}
