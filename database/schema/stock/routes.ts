import { STOCK_ROUTE_TYPES, type StockRouteType } from '@/lib/data/stockRoute';
import { pgTable, varchar, bigint, boolean, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import stockMoves from '@/database/schema/stock/moves';
import stockQuant from '@/database/schema/stock/quant';
import stockRules from '@/database/schema/stock/rules';
import { tallestElement } from '@/lib/utils';

export const stockRoutes: ReturnType<typeof pgTable> = pgTable('stockRoutes', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    active: boolean('active').default(true),
    routeType: varchar('routeType', { length: tallestElement([...STOCK_ROUTE_TYPES]).length, enum: STOCK_ROUTE_TYPES}).notNull().$type<StockRouteType>().default('initial'),
    parentRouteId: bigint('parentRouteId', { mode: 'number' }).references(() => stockRoutes.id),  // Parent location for hierarchy
});


// Define relations for stockRoutes table
export const stockRoutesRelations = relations(stockRoutes, ({ one, many }) => ({
    parentRoute: one(stockRoutes, { fields: [stockRoutes.parentRouteId], references: [stockRoutes.id], relationName: 'stockRoutesHierarchy' }),
    childRoutes: many(stockRoutes, { relationName: 'stockRoutesHierarchy' }),
    // Reverse relations for stockMoves
    sourceMoves: many(stockMoves, { relationName: 'sourceRouteStockMoves' }),
    destinationMoves: many(stockMoves, { relationName: 'destinationRouteStockMoves' }),
    // Reverse relations for stockQuant and stockRules
    stockQuants: many(stockQuant, { relationName: 'routeStockQuant' }),
    stockRules: many(stockRules, { relationName: 'routeStockRules' })
}));

export type StockRoute = typeof stockRoutes.$inferSelect;
export type NewStockRoute = typeof stockRoutes.$inferInsert;
export default stockRoutes;
