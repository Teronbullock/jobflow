import { user } from '@/db/schema/auth-schema';
import { companies, crewMembers } from '@/db/schema/company-schema';
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
  assignTo: text('assignTo').references(() => crewMembers.companyId, {
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
    .references(() => companies.id, { onDelete: 'cascade' }),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  crew: one(crewMembers, {
    fields: [jobs.assignTo],
    references: [crewMembers.id],
  }),
  author: one(user, {
    fields: [jobs.userId],
    references: [user.id],
  }),
}));
