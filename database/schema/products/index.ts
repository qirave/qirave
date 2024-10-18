import {
  pgTable,
  varchar,
  real,
  text,
  timestamp,
  boolean,
  serial,
  integer
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import taxes from '@/database/schema/tax';
import categories from '@/database/schema/category';
import stockQuant from '@/database/schema/stock/quant';
import stockMoves from '@/database/schema/stock/moves';
import stockRules from '@/database/schema/stock/rules';
import INVOICE_POLICIES, { InvoicePolicyType } from '@/lib/data/invoicePolicy';
import PRODUCT_STATUSES, { ProductStatusType } from '@/lib/data/productStatus';
import { tallestElement } from '@/lib/utils';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  canSale: boolean('canSale').default(true),
  canPurchase: boolean('canPurchase').default(true),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  image: varchar('image', { length: 255 }).default('/imgs/product.bmp'),
  price: real('price').notNull(),
  cost: real('cost').notNull().default(0),
  status: varchar('status', {
    enum: PRODUCT_STATUSES,
    length: tallestElement([...PRODUCT_STATUSES]).length
  })
    .notNull()
    .$type<ProductStatusType>()
    .default('active'),
  supplier: varchar('supplier', { length: 255 }),
  sku: varchar('sku', { length: 50 }).unique(),
  barcode: varchar('barcode', { length: 50 }).unique(),
  tags: varchar('tags', { length: 255 }).default(''),
  invoicingPolicy: varchar('invoicingPolicy', {
    length: tallestElement([...PRODUCT_STATUSES]).length,
    enum: INVOICE_POLICIES
  })
    .notNull()
    .$type<InvoicePolicyType>()
    .default('ordered quantities'),
  saleUnitOfMesure: varchar('saleUnitOfMesure', { length: 50 })
    .notNull()
    .default('unit'),
  purchaseUnitOfMesure: varchar('purchaseUnitOfMesure', { length: 50 })
    .notNull()
    .default('unit'),

  // Direct relation to category
  categoryId: integer('categoryId')
    .references(() => categories.id)
    .$defaultFn(() => 2),

  // Direct relation to taxes for sales and purchase
  taxId: integer('taxId').references(() => taxes.id),

  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date())
});

// Define relations for products table
export const productsRelations = relations(products, ({ one, many }) => ({
  tax: one(taxes, {
    fields: [products.taxId],
    references: [taxes.id],
    relationName: 'productTaxes'
  }), // Sales tax relation
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
    relationName: 'productCategory'
  }), // Category relation
  stockQuant: many(stockQuant, { relationName: 'productStockQuant' }), // Product can have multiple stock quantities across routes
  stockMoves: many(stockMoves, { relationName: 'productStockMoves' }), // Product can have multiple stock moves
  stockRules: many(stockRules, { relationName: 'productStockRules' }) // Product can have multiple stock rules
}));

export declare type Product = typeof products.$inferSelect;
export declare type NewProduct = typeof products.$inferInsert;
export default products;
