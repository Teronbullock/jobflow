import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

const testDbConnection = async () => {
  try {
    await db.execute(sql`select 1`);
    console.log('Database connection established.');
  } catch (err) {
    console.error(
      'Error: Could not connect to the database. Server will not start.',
      err
    );
    throw err;
  }
};

await testDbConnection();
