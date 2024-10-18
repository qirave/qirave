export const STOCK_ROUTE_TYPES = [
    "in",
    "out",
    "transfer",
    "adjustment",
    "initial",
] as const;

export type StockRouteType = typeof STOCK_ROUTE_TYPES[number];
export default STOCK_ROUTE_TYPES;