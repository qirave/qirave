import { pgTable, varchar, integer, real, text, timestamp, boolean, char } from 'drizzle-orm/pg-core';
import { randomNumericId } from '@/lib/utils';

export type ProductType = 'goods' | 'service' | 'combo' | 'rental';
export type ProductStatus = 'active' | 'archived' | 'draft';

export const products = pgTable('products', {
    id: char("id", { length: 13 }).primaryKey().$defaultFn(() => randomNumericId()),
    canSell: boolean('canSell').default(true),
    canPurchase: boolean('canPurchase').default(true),
    isTaxable: boolean('isTaxable').default(true),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    image: varchar('image', { length: 255 }).default('/imgs/product.bmp'),
    price: real('price').notNull(),
    costPrice: real('costPrice').notNull().default(0),
    status: text('status').$type<ProductStatus>().notNull().default('draft'),
    vendor: varchar('vendor', { length: 255 }),
    sku: varchar('sku', { length: 50 }).notNull().unique(),
    trackInventory: boolean('trackInventory').default(true), // Option to track inventory
    quantityOnHand: integer('quantityOnHand').default(0), // Stock available right now
    quantityAvailable: integer('quantityAvailable').default(0), // Available to sell (considering outgoing)
    quantityIncoming: integer('quantityIncoming').default(0), // Expected receipts (forecasted)
    quantityOutgoing: integer('quantityOutgoing').default(0), // Expected deliveries (on the way out)
    warehouseLocation: varchar('warehouseLocation', { length: 255 }), // Optional storage location
    reorderLevel: integer('reorderLevel').default(0), // Point at which reordering is triggered
    reorderQty: integer('reorderQty').default(0), // Suggested reorder quantity
    createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export default products;
