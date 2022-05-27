import { RxCollection, RxDocument } from 'rxdb'
import { MaybePromise } from '../../types'
import { Hook } from './hook'
import { CommonOpts } from './type'

export const PreRemove = <T = any, TCol = RxCollection<T>>(
  fn: (this: TCol, _: T, __: RxDocument<T>) => MaybePromise<void>,
  opts: CommonOpts = {}
) => {
  return Hook(`preRemoves`, fn, opts)
}
