import { RxCollection, RxDocument } from 'rxdb'

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

type ExtractMethods<T> = Pick<
  T,
  {
    [key in keyof T]: T[key] extends Function ? key : never
  }[keyof T]
>

type ExtractProperties<T> = Pick<
  T,
  {
    [key in keyof T]: T[key] extends Function ? never : key
  }[keyof T]
>

export type ReturnCollectionType<TCls extends Class> = RxCollection<
  ExtractProperties<InstanceType<TCls>>,
  ExtractMethods<InstanceType<TCls>>,
  ExtractMethods<TCls>
>
export type DocumentType<TCls extends Class> = RxDocument<
  ExtractProperties<InstanceType<TCls>>,
  ExtractMethods<InstanceType<TCls>>
>
