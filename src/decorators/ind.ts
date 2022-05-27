import { indexMetaKey } from '../meta'

export const Index = <T extends Record<string, any>>(
  fields?: (keyof T & string) | (keyof T & string)[]
) => {
  return (arg1: Function | Object, arg2?: string) => {
    if (arg1 instanceof Function) {
      if (!fields)
        throw new Error(`Index on class must specifies fields to index`)
      addIndex(fields, arg1)
    } else {
      if (!arg2) throw new Error(`Index decorator error`)
      addIndex(arg2, arg1.constructor)
    }
  }
}

function addIndex(index: string | string[], cls: Function) {
  const indices = Reflect.getMetadata(indexMetaKey, cls) || []
  indices.push(index)
  Reflect.defineMetadata(indexMetaKey, indices, cls)
}
