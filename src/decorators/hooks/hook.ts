import { hooksMetaKey } from '../../meta'
import { HooksMeta } from './meta'
import { CommonOpts } from './type'

export const Hook = (
  key: keyof HooksMeta,
  fn: Function,
  opts: CommonOpts = {}
) => {
  return (constructor => {
    const hooks: HooksMeta =
      Reflect.getMetadata(hooksMetaKey, constructor) || new HooksMeta()
    hooks[key].push([fn, opts])
    Reflect.defineMetadata(hooksMetaKey, hooks, constructor)
  }) as ClassDecorator
}
