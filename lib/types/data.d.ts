import type { Product } from '@/database/schema/products';
import type { Tax } from '@/database/schema/tax';

export declare type ProductsData = {
  products: Product[];
};

export declare type TaxData = {
  taxes: Tax[];
};