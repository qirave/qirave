// Combo schema for products
import {
  pgTable,
  serial,
  char,
  varchar,
  jsonb,
  timestamp
} from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';

// Combo product schema
export const comboProducts = pgTable('comboProducts', {
  id: serial('id').primaryKey(),
  productId: char('productId', { length: 13 })
    .references(() => products.id)
    .notNull(),
  comboChoiceName: varchar('comboChoiceName', { length: 255 }).notNull(), // E.g., "Drinks", "Burgers"
  comboOptions: jsonb('comboOptions').notNull(), // Array of product IDs [{ "type": "drink", "products": [123, 456]}, ...]
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

export type ComboProduct = typeof comboProducts.$inferSelect;
export type NewComboProduct = typeof comboProducts.$inferInsert;

export default comboProducts;
