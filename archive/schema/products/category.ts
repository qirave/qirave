import { pgTable, serial, char, timestamp, integer } from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';
import categories from '@/database/schema/category';

// Product-category association
export const productCategories = pgTable('productCategories', {
  id: serial('id').primaryKey(),
  productId: char('productId', { length: 13 })
    .references(() => products.id)
    .notNull(),
  categoryId: integer('categoryId').references(() => categories.id),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

export type ProductCategory = typeof productCategories.$inferSelect;
export type NewProductCategory = typeof productCategories.$inferInsert;
export default productCategories;
