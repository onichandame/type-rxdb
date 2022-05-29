import { createRxDatabase, RxDatabase } from 'rxdb'
import { randomUUID } from 'node:crypto'
import { getRxStorageMemory } from 'rxdb/plugins/memory'

import { PreInsert, ReturnCollectionType, Collection, Field } from '.'
import { addCollection } from './functions/addCollection'

describe(`end to end test`, () => {
  @PreInsert<Model>(function (input) {
    input.id = randomUUID()
    input.createdAt = new Date()
  })
  @Collection({ name: `model`, version: 0 })
  class Model {
    @Field({ primaryKey: true })
    id!: string
    @Field()
    createdAt!: Date
    @Field()
    firstName!: string
    @Field()
    lastName!: string

    getFullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
  type Collections = { model: ReturnCollectionType<typeof Model> }

  let db: RxDatabase<Collections>
  beforeAll(async () => {
    db = await createRxDatabase<Collections>({
      storage: getRxStorageMemory(),
      name: `test`,
    })
    await addCollection(db, Model)
  })
  afterAll(async () => db.destroy())

  test(`full test`, async () => {
    const firstName = randomUUID()
    const lastName = randomUUID()
    const doc = await db.model.insert({ firstName, lastName } as any)
    expect(doc.id).toBeTruthy()
    expect(doc.firstName).toEqual(firstName)
    expect(doc.lastName).toEqual(lastName)
    expect(doc.getFullName()).toEqual(`${firstName} ${lastName}`)
  })
})
