# Type-RxDB

_WIP_

RxDB with more typescript integrations.

## Features

- Write once, get both schema and ts types
- index
- hooks

Example:

```typescript
import {
  PreInsert,
  Collection,
  Field,
  ReturnCollectionType,
  addCollection,
} from '@onichandame/type-rxdb'
import { createRxDatabase } from 'rxdb'

// arrow functions are not allowed for hooks
@PreInsert<User>(function (this, input) {
  if (!this.lastName) throw new Error(`lastName must not be empty`)
  input.id = window.crypto.randomUUID()
})
// collections must have name and version defined. `name` specifies which key under db corresponds to the collection
@Collection({ name: `user`, version: 0 })
class User {
  // every collection must have EXACTLY ONE primary key
  @Field({ primaryKey: true })
  id!: string
  @Field()
  firstName!: string
  @Field()
  lastName!: string

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

type Collections = { user: ReturnCollectionType<typeof User> }

const db = await createRxDatabase<Collections>({
  /** ... */
})
await addCollection(db, User)

// use db.user to do CRUD!
```

For more complex examples see [the e2e test](./src/index.test.ts)

## Caveats

- getters and setters on the model are not supported
