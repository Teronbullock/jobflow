import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { organization } from '@/db/schema/auth-schema';

export const client = pgTable('client', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address'),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const clientRelations = relations(client, ({ one }) => ({
  organization: one(organization, {
    fields: [client.organizationId],
    references: [organization.id],
  }),
}));
