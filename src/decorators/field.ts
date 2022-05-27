import { TopLevelProperty } from 'rxdb/dist/types/types'

import { fieldMetaKey, primaryKeyMetaKey } from '../meta'

type FieldOpts = TopLevelProperty & { primaryKey?: boolean }

export const Field = ({ primaryKey, ...opts }: FieldOpts = {}) => {
  return ((prototype, key) => {
    if (typeof key !== `string`)
      throw new Error(`field ${key.toString()} must be string`)
    if (primaryKey) {
      if (Reflect.hasMetadata(primaryKeyMetaKey, prototype.constructor))
        throw new Error(
          `only one primary key can be defined in model ${prototype.constructor.name}`
        )
      Reflect.defineMetadata(primaryKeyMetaKey, key, prototype.constructor)
    }
    opts.type =
      opts.type || parseType(Reflect.getMetadata(`design:type`, prototype, key))
    addFieldMeta(key, opts, prototype.constructor)
  }) as PropertyDecorator
}

function parseType(raw: any) {
  switch (raw) {
    case Number:
      return `number`
    case String:
      return `string`
    case Boolean:
      return `boolean`
    case Date:
      return `date-time`
    default:
      return `object`
  }
}

function addFieldMeta(key: string, meta: TopLevelProperty, cls: any) {
  const fieldMeta = getFieldMeta(cls)
  fieldMeta[key] = meta
  Reflect.defineMetadata(fieldMetaKey, fieldMeta, cls)
}

export function getFieldMeta(cls: any) {
  return Reflect.getMetadata(fieldMetaKey, cls) || {}
}
