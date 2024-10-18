export const INVOICE_POLICIES = [
    "ordered quantities",
    "delivered quantities",
] as const;

export type InvoicePolicyType = typeof INVOICE_POLICIES[number];
export default INVOICE_POLICIES;