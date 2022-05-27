import { CommonOpts } from './type'

export class HooksMeta {
  preInserts: [Function, CommonOpts][] = []
  postInserts: [Function, CommonOpts][] = []
  preSaves: [Function, CommonOpts][] = []
  postSaves: [Function, CommonOpts][] = []
  preRemoves: [Function, CommonOpts][] = []
  postRemoves: [Function, CommonOpts][] = []
  postCreates: [Function, CommonOpts][] = []
}
