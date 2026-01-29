import { user } from '@/db/schema/auth-schema';
import { jobs } from '@/db/schema/job-schema';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const company = pgTable('company', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
});

export const crewMember = pgTable('crew_member', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  companyId: uuid('company_id')
    .notNull()
    .references(() => company.id, { onDelete: 'cascade' }),
});

export const companyRelations = relations(company, ({ many, one }) => ({
  user: one(user, {
    fields: [company.id],
    references: [user.companyId],
  }),
  crewMembers: many(crewMember),
  jobs: many(jobs),
}));

export const crewMemberRelations = relations(crewMember, ({ many }) => ({
  company: many(user),
  jobs: many(jobs),
}));
