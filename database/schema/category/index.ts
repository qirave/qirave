import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import products from '@/database/schema/products';

// Product categories schema
export const categories: ReturnType<typeof pgTable> = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parentId: integer('parentId').references(() => categories.id),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

// Define relations for categories table
export const categoriesRelations = relations(categories, ({ many, one }) => ({
  products: many(products, { relationName: 'productCategory' }),
  parentCategory: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryHierarchy'
  }),
  childCategories: many(categories, { relationName: 'categoryHierarchy' })
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export default categories;
