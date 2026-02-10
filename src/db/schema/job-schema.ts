import { user } from '@/db/schema/auth.schema';
import { company, crewMember } from '@/db/schema/company.schema';
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

export const jobs = pgTable('jobs', {
  id: uuid().defaultRandom().primaryKey(),
  clientName: text('client_name').notNull(),
  address: text('address'),
  description: text('description'),
  date: date({ mode: 'date' }),
  time: time().notNull(),
  assignTo: uuid('assignTo').references(() => crewMember.id, {
    onUpdate: 'cascade',
    onDelete: 'set null',
  }),
  amount: decimal('amount').notNull(),
  status: text('status').default('Scheduled'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('created_at').defaultNow().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id')
    .notNull()
    .references(() => company.id, { onDelete: 'cascade' }),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  company: one(company, {
    fields: [jobs.companyId],
    references: [company.id],
  }),
  crew: one(crewMember, {
    fields: [jobs.assignTo],
    references: [crewMember.id],
  }),
  user: one(user, {
    fields: [jobs.userId],
    references: [user.id],
  }),
}));
