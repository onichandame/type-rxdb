export type Class<T = any> = { new (..._: any[]): T }

export type MaybePromise<T> = T | Promise<T>

export type NonEmptyArray<T> = [T, ...T[]]

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
