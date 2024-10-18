import { NewTax } from "@/database/schema/tax";

// DEFAULT MOROCCAN TAXES
export const DEFAULT_TAXES: NewTax[] = [
    {
        id: 1,
        name: 'VAT',
        code: 'VAT',
        on: ["sales","purchase"],
        description: 'Value Added Tax',
        rate: 20,
        type: 'percentage',
    },
    {
        id: 2,
        name: 'RST',
        code: 'RST',
        on: ["sales"],
        description: 'Restaurant Tax',
        rate: 11,
        type: 'percentage',
    },
] as const;

export const TAXES_TYPES = ['percentage', 'fixed'] as const; // percentage or fixed amount
export const TAXES_ON = ['sales', 'purchase'] as const; // taxes applied on sales or purchase or both (default is both)
export const TAXES_CALCULATION = ['excluded', 'included'] as const; // included in price or excluded from price (default is excluded)

export type TaxType = typeof TAXES_TYPES[number];
export type TaxOn = typeof TAXES_ON[number] | TaxOn[];
export type TaxCalculation = typeof TAXES_CALCULATION[number];


export default DEFAULT_TAXES;