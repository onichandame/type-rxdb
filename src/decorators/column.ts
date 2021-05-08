import { RxJsonSchema } from 'rxdb'
import 'reflect-metadata'

import { guardKeyType } from '../utils'
import { getOrCreateStore } from '../store'

type Args = RxJsonSchema['properties'][string]

export const Column = (args: Args) => {
  return ((prototype, key) => {
    if (guardKeyType(key)) {
      args.type =
        args.type || Reflect.getMetadata(`design:type`, prototype, key)
      const store = getOrCreateStore(prototype)
      store.schema.properties[key] = args
    }
  }) as PropertyDecorator
}
