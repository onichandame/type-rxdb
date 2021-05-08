export { RxCollectionCreatorBase } from 'rxdb/dist/types/types/rx-collection'
export { RxJsonSchema } from 'rxdb'

export type ExtractProps<ObjectType> = Pick<
  ObjectType,
  {
    [Property in keyof ObjectType]: ObjectType[Property] extends (
      ..._: unknown[]
    ) => unknown
      ? never
      : Property
  }[keyof ObjectType]
>

export type ExtractMethods<ObjectType> = Pick<
  ObjectType,
  {
    [Property in keyof ObjectType]: ObjectType[Property] extends (
      ..._: unknown[]
    ) => unknown
      ? Property
      : never
  }[keyof ObjectType]
>
