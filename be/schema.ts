import { serial, text, pgTable, uniqueIndex } from 'drizzle-orm/pg-core';
import { InferInsertModel } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export type NewUser = InferInsertModel<typeof users>;
