import 'reflect-metadata'
import { randomUUID } from 'node:crypto'
import { createRxDatabase, RxDatabase } from 'rxdb'
import { getRxStorageMemory } from 'rxdb/plugins/memory'

import { Collection, Field, PreInsert } from '../decorators'
import { addCollection } from './addCollection'

describe(`addCollection`, () => {
  let db: RxDatabase
  beforeEach(async () => {
    db = await createRxDatabase({
      name: `test`,
      storage: getRxStorageMemory(),
    })
  })
  afterEach(async () => db.destroy())
  test(`add plain collection`, async () => {
    @Collection({ version: 0, name: `test` })
    class Test {
      @Field({ primaryKey: true })
      id!: string
    }
    await addCollection(db, Test)
    expect(db.test).toBeTruthy()
  })
  test(`add hooks`, async () => {
    const id = randomUUID()
    @PreInsert<Test>(function (this, doc) {
      doc.id = id
    })
    class Base {}
    @Collection({ name: `test`, version: 0 })
    class Test extends Base {
      @Field({ primaryKey: true })
      id!: string
    }
    await addCollection(db, Test)
    const doc = await db.test?.insert({ id: randomUUID() })
    expect(doc.id).toEqual(id)
  })
})
