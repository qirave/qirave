// src/db/schema/product.ts

import {
  pgTable,
  serial,
  varchar,
  timestamp,
  bigint
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import products from '@/database/schema/products';

export const variants = pgTable('variants', {
  id: serial('id').primaryKey(),
  productId: bigint('productId', { mode: 'number' })
    .references(() => products.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

export const variantValues = pgTable('variantValues', {
  id: serial('id').primaryKey(),
  variantId: bigint('variantId', { mode: 'number' })
    .references(() => variants.id)
    .notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

// Smart Variant Associations
export const variantRestrictions = pgTable('variantRestrictions', {
  id: serial('id').primaryKey(),
  productId: bigint('productId', { mode: 'number' })
    .references(() => products.id)
    .notNull(),
  variantId: bigint('variantId', { mode: 'number' })
    .references(() => variants.id)
    .notNull(),
  allowedValueId: bigint('allowedValueId', { mode: 'number' })
    .references(() => variantValues.id)
    .notNull()
});

// Define relations for variants (product -> variant)
export const productVariantRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id]
  })
}));

// Define relations for variantValues (variant -> variantValue)
export const variantValueRelations = relations(variantValues, ({ one }) => ({
  variant: one(variants, {
    fields: [variantValues.variantId],
    references: [variants.id]
  })
}));

// Define relations for variantRestrictions (product -> variant -> variantValue)
export const variantRestrictionRelations = relations(
  variantRestrictions,
  ({ one }) => ({
    product: one(products, {
      fields: [variantRestrictions.productId],
      references: [products.id]
    }),
    variant: one(variants, {
      fields: [variantRestrictions.variantId],
      references: [variants.id]
    }),
    allowedValue: one(variantValues, {
      fields: [variantRestrictions.allowedValueId],
      references: [variantValues.id]
    })
  })
);

export type Variant = typeof variants.$inferSelect;
export type NewVariant = typeof variants.$inferInsert;
export type VariantValue = typeof variantValues.$inferSelect;
export type NewVariantValue = typeof variantValues.$inferInsert;
// export type VariantRestriction = typeof variantRestrictions.$inferSelect;
// export type NewVariantRestriction = typeof variantRestrictions.$inferInsert;

export default variants;
