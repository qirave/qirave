// Category schema
import { 
    categories,
    categoriesRelations
} from "@/database/schema/category";

// Product schema
import { 
    products,
    productsRelations
} from "@/database/schema/products";

import { 
    variants,
    variantValues,
    variantValueRelations,
    productVariantRelations,
    variantRestrictions,
    variantRestrictionRelations,
} from "@/database/schema/products/variants";

// Tax schema
import { 
    taxes,
    taxesRelations,
} from "@/database/schema/tax";

// Stock schema
import { 
    stockRoutes,
    stockRoutesRelations,
} from "@/database/schema/stock/routes";

import { 
    stockRules,
    stockRulesRelations,
} from "@/database/schema/stock/rules";

import { 
    stockQuant,
    stockQuantRelations,
} from "@/database/schema/stock/quant";

import { 
    stockMoves,
    stockMovesRelations,
} from "@/database/schema/stock/moves";


const schema = {
    categories,
    categoriesRelations,

    products,
    productsRelations,
    variants,
    variantValues,
    productVariantRelations,
    variantValueRelations,
    variantRestrictions,
    variantRestrictionRelations,

    taxes,
    taxesRelations,

    stockRoutes,
    stockRoutesRelations,
    stockRules,
    stockRulesRelations,
    stockQuant,
    stockQuantRelations,
    stockMoves,
    stockMovesRelations,
};

export default schema;