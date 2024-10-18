import {
  pgTable,
  text,
  boolean,
  integer,
  primaryKey,
  timestamp
} from 'drizzle-orm/pg-core';
import users from './users';

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$onUpdateFn(() => new Date())
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID]
    })
  })
);

export type Authenticator = typeof authenticators.$inferSelect;
export type NewAuthenticator = typeof authenticators.$inferInsert;
export default authenticators;
