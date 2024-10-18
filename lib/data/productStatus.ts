export const PRODUCT_STATUSES = [
    "active",
    "onhold",
    "archived",
] as const;

export const PRODUCT_STATUSES_TAGS = {
    active : { 
        backgroundColor: "#b5ffc9",
        color: "#27bd5f",
        borderColor: "#27bd5f",
    },
    onhold:{ 
        backgroundColor: "#f0f4ff",
        color: "#838485",
        borderColor: "#838485",
    },
    archived: { 
        backgroundColor: "#edd9c9",
        color: "#a58369",
        borderColor: "#b37c50",
    },
} as const;

export type ProductStatusType = typeof PRODUCT_STATUSES[number];
export default PRODUCT_STATUSES;