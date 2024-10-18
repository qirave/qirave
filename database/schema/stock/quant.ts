import { pgTable, bigint, real } from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';
import stockRoutes from '@/database/schema/stock/routes';
import { relations } from 'drizzle-orm';

export const stockQuant = pgTable('stockQuant', {
  productId: bigint('productId', { mode: 'number' })
    .references(() => products.id)
    .notNull(),
  routeId: bigint('routeId', { mode: 'number' })
    .references(() => stockRoutes.id)
    .notNull(),
  quantityAvailable: real('quantityAvailable').default(0), // Quantity available
  quantityOnHand: real('quantityOnHand').default(0), // Quantity on hand
  quantityOutgoing: real('quantityOutgoing').default(0), // Quantity outgoing (reserved)
  quantityForecasted: real('quantityForecasted').default(0) // Forecasted quantity
});

// Define relations for stockQuant table
export const stockQuantRelations = relations(stockQuant, ({ one }) => ({
  product: one(products, {
    fields: [stockQuant.productId],
    references: [products.id],
    relationName: 'productStockQuant'
  }),
  route: one(stockRoutes, {
    fields: [stockQuant.routeId],
    references: [stockRoutes.id],
    relationName: 'routeStockQuant'
  })
}));

export type StockQuant = typeof stockQuant.$inferSelect;
export type NewStockQuant = typeof stockQuant.$inferInsert;
export default stockQuant;
