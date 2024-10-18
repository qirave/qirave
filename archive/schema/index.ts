// Auth schema
import accounts from "./auth/accounts";
import roles from "./auth/authenticators";
import sessions from "./auth/sessions";
import users from "./auth/users";
import verificationTokens from "./auth/verificationTokens";
// Product schema
import products from "./products";
import variants, { variantValues, productVariantRestrictions } from "./products/variants";

const schema = {
    accounts,
    roles,
    sessions,
    users,
    verificationTokens,
    products,
    variants,
    variantValues,
    productVariantRestrictions,
};

export default schema;