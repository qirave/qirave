import { pgTable, serial, varchar, text, timestamp, real } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import products from '@/database/schema/products';
import { TAXES_ON, TAXES_CALCULATION, TAXES_TYPES, TaxOn, TaxCalculation, TaxType } from '@/lib/data/tax';
import { tallestElement } from '@/lib/utils';
import { z } from 'zod';

export const taxes = pgTable('taxes', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    code: varchar('code', { length: 50 }),
    on: varchar('on', { enum: TAXES_ON, length: tallestElement([...TAXES_ON]).length }).array().$type<TaxOn>().notNull().default([...TAXES_ON]),
    calculation: varchar('calculation', { length: tallestElement([...TAXES_CALCULATION]).length, enum: TAXES_CALCULATION }).notNull().$type<TaxCalculation>().default('excluded'),
    description: text('description'),
    rate: real('rate').notNull(),
    type: varchar('type', { length: tallestElement([...TAXES_TYPES]).length, enum: TAXES_TYPES}).notNull().$type<TaxType>().default('percentage'),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
});

// Define relations for taxes table
export const taxesRelations = relations(taxes, ({ many }) => ({
    products: many(products, { relationName: 'productTaxes' }), // Relation to products
}));

// ZOD schema for inserting new tax
export const insertTaxSchema = createInsertSchema(taxes, {
    name: z.string().min(3),
    rate: z.number({ message: "Tax rate is required" }).min(0, "Tax rate should be greater than 0"),
}).superRefine((data, ctx) => {
    // Custom validation to check rate if type is 'percentage'
    if (data.type === 'percentage' && data.rate > 100) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['rate'],
            message: 'Rate should be less than or equal to 100 if the type is percentage',
        });
    }
});

export type Tax = typeof taxes.$inferSelect;
export type NewTax = typeof taxes.$inferInsert;
export default taxes;