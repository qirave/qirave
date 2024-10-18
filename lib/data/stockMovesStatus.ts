export const STOCK_MOVES_STATUSES = [
    "pending",
    "done",
    "canceled",
] as const;

export type StockMoveStatusType = typeof STOCK_MOVES_STATUSES[number];
export default STOCK_MOVES_STATUSES;