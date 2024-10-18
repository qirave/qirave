import { pgTable, bigint, varchar, real } from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';
import stockRoutes from '@/database/schema/stock/routes';
import { STOCK_RULES, type StockRuleType } from '@/lib/data/stockRule';
import { relations } from 'drizzle-orm';
import { tallestElement } from '@/lib/utils';

export const stockRules = pgTable('stockRules', {
    productId: bigint('productId', { mode: 'number'}).references(() => products.id).notNull(),
    routeId: bigint('routeId', { mode: 'number'}).references(() => stockRoutes.id).notNull(),
    minQuantity: real('minQuantity').default(0),  // Minimum stock before reorder
    maxQuantity: real('maxQuantity').default(0),  // Maximum stock to maintain
    ruleType: varchar('ruleType', { length: tallestElement([...STOCK_RULES]).length, enum: STOCK_RULES}).notNull().$type<StockRuleType>().default('reorder'),
});

// Define relations for stockRules table
export const stockRulesRelations = relations(stockRules, ({ one }) => ({
    product: one(products, { fields: [stockRules.productId], references: [products.id], relationName: 'productStockRules' }),
    route: one(stockRoutes, { fields: [stockRules.routeId], references: [stockRoutes.id], relationName: 'routeStockRules' })
}));

export type StockRule = typeof stockRules.$inferSelect;
export type NewStockRule = typeof stockRules.$inferInsert;
export default stockRules;