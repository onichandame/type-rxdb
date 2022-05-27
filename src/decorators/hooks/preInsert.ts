import { RxCollection } from 'rxdb'
import { MaybePromise } from '../../types'
import { Hook } from './hook'
import { CommonOpts } from './type'

export const PreInsert = <T = any, TCol = RxCollection<T>>(
  fn: (this: TCol, _: T) => MaybePromise<void>,
  opts: CommonOpts = {}
) => {
  return Hook(`preInserts`, fn, opts)
}
