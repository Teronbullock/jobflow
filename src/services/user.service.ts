import {db} from '@db/db';
import { usersTable } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';


export async function seedAndTestUserOperations() {
  // Define the user data using Drizzle's type inference
  const user: InferInsertModel<typeof usersTable> = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  // CREATE
  await db.insert(usersTable).values(user);
  console.log('New user created!');

  // READ
  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
  /* Type of users is automatically inferred */

}