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
    addRxPlugin(require(`pouchdb-adapter-leveldb`))
    console.log(`initing db`)
    db = await createRxDatabase({ name: `test`, adapter: require(`memdown`) })
    console.log(`inited db`)
    done()
  })

  afterAll(async done => {
    console.log(`destroyed`)
    await db.destroy()
    done()
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
    console.log(`modified`)
    done()
  })

  test(`can inherit class`, async done => {
    console.log(`hi`)
    ;(async () => {
      @Collection({ type: `object`, version: 0 })
      class Student extends Person {
        @Column({})
        grade!: number
      }
      const collection = await getCollectionForClass<Student>(Student, db)
      collection
      //console.log(`bitch`)
      //const name = randStr()
      //const grade = parseInt(Math.random().toString().substr(-1))
      //await collection.insert({ name, grade })
      //const doc = await collection.findOne({ selector: { name } }).exec()
      //expect(doc).toHaveProperty(`grade`, grade)
      done()
    })()
  })
})
