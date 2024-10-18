import { NewCategory } from "@/database/schema/category";

export const CATEGORIES: NewCategory = [
    { 
        id: 1,
        name: 'All', 
        description: 'Default category for All' 
    },
    { 
        id: 2,
        parentId: 1,
        name: 'Uncategorized', 
        description: 'Default category for uncategorized products'
    },
    {
        id: 3,
        parentId: 1,
        name: 'Stock',
        description: 'Category for Stock Management'
    },
    {
        id: 4,
        parentId: 3,
        name: 'Reciepts',
        description: 'Category for Stock Receipts'
    },
    {
        id: 5,
        parentId: 3,
        name: 'Deliveries',
        description: 'Category for Stock Deliveries'
    }

] as const;

export type CategoryType = typeof CATEGORIES[number];
export default CATEGORIES;