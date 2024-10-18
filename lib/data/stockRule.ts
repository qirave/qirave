export const STOCK_RULES = [
    'reorder',
    'transfer',
    'produce',
] as const;

export type StockRuleType = typeof STOCK_RULES[number];
export default STOCK_RULES;