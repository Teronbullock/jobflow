import { user } from '@/db/schema/auth-schema';
import { jobs } from '@/db/schema/job-schema';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const crewMembers = pgTable('crew_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  companyId: uuid('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
});

export const companyRelations = relations(companies, ({ many, one }) => ({
  user: one(user, {
    fields: [companies.userId],
    references: [user.id],
  }),
  crewMembers: many(crewMembers),
  jobs: many(jobs),
}));

export const crewMemberRelations = relations(crewMembers, ({ one, many }) => ({
  company: one(companies, {
    fields: [crewMembers.companyId],
    references: [companies.id],
  }),
  jobs: many(jobs),
}));
