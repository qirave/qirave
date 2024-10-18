import { pgTable, bigint, varchar, real, timestamp } from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';
import stockRoutes from '@/database/schema/stock/routes';
import { STOCK_MOVES_STATUSES, type StockMoveStatusType } from '@/lib/data/stockMovesStatus';
import { relations } from 'drizzle-orm';
import { tallestElement } from '@/lib/utils';

export const stockMoves = pgTable('stockMoves', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    productId: bigint('productId', {mode: 'number'}).references(() => products.id).notNull(),
    quantity: real('quantity').notNull(),
    sourceRouteId: bigint('sourceRouteId', {mode: 'number'}).references(() => stockRoutes.id).notNull(),
    destinationRouteId: bigint('destinationRouteId', {mode: 'number'}).references(() => stockRoutes.id).notNull(),
    status: varchar('status', { length: tallestElement([...STOCK_MOVES_STATUSES]).length, enum: STOCK_MOVES_STATUSES}).notNull().$type<StockMoveStatusType>().default('pending'),
    date: timestamp('date').defaultNow(),
});

// Define relations for stockMoves table
export const stockMovesRelations = relations(stockMoves, ({ one }) => ({
    product: one(products, { fields: [stockMoves.productId], references: [products.id], relationName: 'productStockMoves' }),
    sourceRoute: one(stockRoutes, { fields: [stockMoves.sourceRouteId], references: [stockRoutes.id], relationName: 'sourceRouteStockMoves' }),
    destinationRoute: one(stockRoutes, { fields: [stockMoves.destinationRouteId], references: [stockRoutes.id], relationName: 'destinationRouteStockMoves' })
}));

export type StockMove = typeof stockMoves.$inferSelect;
export type NewStockMove = typeof stockMoves.$inferInsert;
export default stockMoves;