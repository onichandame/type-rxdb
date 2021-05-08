import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb'

import { Collection, Column } from './decorators'
import { getCollectionForClass } from './functions'

const randStr = () => Math.random().toString(36).substr(2, 5)

@Collection({ type: `object`, version: 0 })
class Person {
  @Column({ primary: true, type: `string` })
  name!: string
}

describe(`type-rxdb`, () => {
  let db: RxDatabase
  beforeAll(async done => {
    addRxPlugin(require(`pouchdb-adapter-memory`))
    db = await createRxDatabase({ name: `test`, adapter: `memory` })
    done()
  })

  afterAll(() => {
    db.destroy()
  })

  test(`can use decorators`, () => {
    return expect(Person).toBeDefined()
  })

  test(`can get collection`, async done => {
    const collection = await getCollectionForClass<Person>(Person, db)
    expect(collection).toBeDefined()
    done()
  })

  test(`can modify docs`, async done => {
    const collection = await getCollectionForClass<Person>(Person, db)
    const name = randStr()
    await collection.insert({ name })
    const doc = await collection.findOne({ selector: { name } }).exec()
    expect(doc).toBeTruthy()
    done()
  })
})
