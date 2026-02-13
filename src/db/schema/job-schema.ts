import { organization, member } from '@/db/schema/auth-schema';
import { client } from '@/db/schema/client-schema';
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
  clientId: text('client_id')
    .notNull()
    .references(() => client.id, {
      onUpdate: 'cascade',
      onDelete: 'set null',
    }),
  description: text('description'),
  date: date({ mode: 'date' }),
  time: time().notNull(),
  assignTo: text('assign_to').references(() => member.id, {
    onUpdate: 'cascade',
    onDelete: 'set null',
  }),
  amount: decimal('amount').notNull(),
  status: text('status').default('Scheduled'),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('created_at').defaultNow().notNull(),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  organization: one(organization, {
    fields: [jobs.organizationId],
    references: [organization.id],
  }),
  member: one(member, {
    fields: [jobs.assignTo],
    references: [member.id],
  }),
  client: one(client, {
    fields: [jobs.clientId],
    references: [client.id],
  }),
}));
