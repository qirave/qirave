import { pgTable, char, boolean, numeric, integer } from 'drizzle-orm/pg-core';
import products from '@/database/schema/products';

export const rentableProducts = pgTable('rentableProducts', {
  id: char('id', { length: 13 })
    .primaryKey()
    .references(() => products.id), // Reference to products
  isInternalRental: boolean('isInternalRental').default(false), // Whether it's rented for internal use
  isExternalRental: boolean('isExternalRental').default(true), // Whether it's rented to clients

  // Rental pricing based on time intervals (can be flexible)
  rentalPricePerHour: numeric('rentalPricePerHour', {
    precision: 10,
    scale: 2
  }), // Optional, can be null
  rentalPricePerDay: numeric('rentalPricePerDay', { precision: 10, scale: 2 }), // Optional, can be null
  rentalPricePerWeek: numeric('rentalPricePerWeek', {
    precision: 10,
    scale: 2
  }), // Optional, can be null
  rentalPricePerMonth: numeric('rentalPricePerMonth', {
    precision: 10,
    scale: 2
  }), // Optional, can be null

  // Minimum rental duration in hours, days, weeks, or months
  minRentalDuration: integer('minRentalDuration').default(1), // Minimum number of units (hours, days, etc.)

  // Option to limit the maximum duration a product can be rented for
  maxRentalDuration: integer('maxRentalDuration') // Optional, can be null
});

export type RentableProduct = typeof rentableProducts.$inferSelect;
export type NewRentableProduct = typeof rentableProducts.$inferInsert;
export default rentableProducts;
