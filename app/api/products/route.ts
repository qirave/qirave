// NextJS API route for fetching products
import { Query } from '@/abstract/query';
import type { NewProduct, ProductStatus } from '@/database/schema/products';



export async function GET() {
    // Fetch all products from the database
    const query = new Query({
        name: "products",
        query: "./database/queries/products.gql"
    });
    const { data }: ProductsResponse = await query.gqlFetch();
    console.log(data);

    // Return the products as JSON
    return Response.json(data);
}

// create a new random product for testing
export async function POST() {
    const query = new Query({
        name: "ADD_PRODUCT",
        method: "POST",
        query: "./database/queries/InsertIntoProductsSingle.gql",
        variables: {
            values: {
                status: ['active', 'draft', 'archived'][Math.floor(Math.random() * 2)] as ProductStatus,
                name: 'Product ' + Math.floor(Math.random() * 100),
                description: 'This is a random product',
                price: Math.floor(Math.random() * 100),
                costPrice: Math.floor(Math.random() * 100),
                sku: 'SKU-' + crypto.randomUUID().split('-')[0].toUpperCase(),
                vendor: 'Vendor ' + Math.floor(Math.random() * 100),
                canPurchase: Math.random() > 0.5,
                canSell: Math.random() > 0.5,
                isTaxable: Math.random() > 0.5,
                quantityAvailable: Math.floor(Math.random() * 100),
                quantityIncoming: Math.floor(Math.random() * 100),
                quantityOnHand: Math.floor(Math.random() * 100),
                quantityOutgoing: Math.floor(Math.random() * 100),
                reorderLevel: Math.floor(Math.random() * 100),
                reorderQty: Math.floor(Math.random() * 100),
                warehouseLocation: 'Warehouse ' + Math.floor(Math.random() * 100),
            } as NewProduct
        }
    });

    // Save the new product to the database
    const { data }: ProductsResponse = await query.gqlFetch();

    // Return the new product as JSON
    return Response.json(data);
}
