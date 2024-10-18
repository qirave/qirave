import { pgTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Suppliers schema
export const suppliers = pgTable('suppliers', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(), // Supplier's name
    contactPerson: varchar('contactPerson', { length: 255 }), // Contact person's name
    phone: varchar('phone', { length: 20 }), // Supplier's phone number
    email: varchar('email', { length: 255 }).unique(), // Supplier's email (should be unique)
    address: text('address'), // Supplier's address
    city: varchar('city', { length: 100 }), // Supplier's city
    state: varchar('state', { length: 100 }), // Supplier's state
    country: varchar('country', { length: 100 }), // Supplier's country
    postalCode: varchar('postalCode', { length: 20 }), // Supplier's postal code
    isActive: boolean('isActive').default(true), // Status indicating if the supplier is active
    createdAt: timestamp('createdAt').defaultNow(), // Record creation timestamp
    updatedAt: timestamp('updatedAt').defaultNow().$onUpdateFn(() => new Date()), // Record update timestamp
});

export type Supplier = typeof suppliers.$inferSelect; // Type for selecting suppliers
export type NewSupplier = typeof suppliers.$inferInsert; // Type for inserting new suppliers
export default suppliers;
