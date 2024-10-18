// src/db/schema/product.ts

import { pgTable, serial, varchar, char, integer, timestamp } from 'drizzle-orm/pg-core';
import { randomNumericId } from '@/lib/utils';
import products from '.';

export const variants = pgTable('variants', {
    id: char("id", { length: 13 }).primaryKey().$defaultFn(() => randomNumericId()),
    productId: char('productId', {length: 13}).references(() => products.id).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
});

export const variantValues = pgTable('variantValues', {
    id: serial('id').primaryKey(),
    variantId: char('variantId', {length: 13}).references(() => variants.id).notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
});

// Smart Variant Associations
export const productVariantRestrictions = pgTable('productVariantRestrictions', {
    id: serial('id').primaryKey(),
    productId: char('productId', {length: 13}).references(() => products.id).notNull(),
    variantId: char('variantId', {length: 13}).references(() => variants.id).notNull(),
    allowedValueId: integer('allowedValueId').references(() => variantValues.id), // Allowed value for that product
});

export type Variant = typeof variants.$inferSelect;
export type NewVariant = typeof variants.$inferInsert;
export type VariantValue = typeof variantValues.$inferSelect;
export type NewVariantValue = typeof variantValues.$inferInsert;
export type ProductVariantRestriction = typeof productVariantRestrictions.$inferSelect;
export type NewProductVariantRestriction = typeof productVariantRestrictions.$inferInsert;

export default variants;
