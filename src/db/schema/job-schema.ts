import { user } from '@/db/schema/auth-schema';
import { relations } from 'drizzle-orm';
import {
  pgTable,
  date,
  uuid,
  text,
  time,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';

export const job = pgTable('jobs', {
  id: uuid().defaultRandom().primaryKey(),
  clientName: text('client_name').notNull(),
  address: text('address'),
  description: text('description'),
  date: date({ mode: 'date' }),
  time: time().notNull(),
  assignTo: text('assignTo'),
  amount: decimal('amount').notNull(),
  status: text('status').default('Scheduled'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('created_at').defaultNow().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const jobRelations = relations(job, ({ one }) => ({
  user: one(user, {
    fields: [job.userId],
    references: [user.id],
  }),
}));
