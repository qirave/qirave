import {
  pgTable,
  char,
  boolean,
  numeric,
  varchar,
  timestamp
} from 'drizzle-orm/pg-core';
import rentableProducts from '@/database/schema/products/rental';

export const rentalTransactions = pgTable('rentalTransactions', {
  id: char('id', { length: 13 }).primaryKey(),
  rentableProductId: char('rentableProductId', { length: 13 }).references(
    () => rentableProducts.id
  ), // Reference to the rentable product

  // Rental party details
  isInternalRental: boolean('isInternalRental').default(false), // Whether it's an internal rental
  clientId: char('clientId', { length: 17 }).notNull(), // Reference to the client

  // Rental duration and period
  rentalStartDate: timestamp('rentalStartDate').notNull(),
  rentalEndDate: timestamp('rentalEndDate').notNull(),
  rentalPeriod: varchar('rentalPeriod', { length: 50 }).notNull(), // E.g., 'hourly', 'daily', 'weekly', 'monthly'

  // Pricing information
  rentalPrice: numeric('rentalPrice', { precision: 10, scale: 2 }).notNull(), // Total rental price for the contract

  // Tracking rental status
  isActive: boolean('isActive').default(true) // Whether the rental is currently active
});

export type RentalTransaction = typeof rentalTransactions.$inferSelect;
export type NewRentalTransaction = typeof rentalTransactions.$inferInsert;
export default rentalTransactions;
