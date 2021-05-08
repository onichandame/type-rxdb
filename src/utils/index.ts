export const guardKeyType = (raw: any): raw is string => {
  if (typeof raw !== `string`)
    throw new Error(`only properties keyed by string is accepted`)
  return true
}
