import type { Metadata } from "next";
import { PreloadQuery } from "@/providers/apollo.rsc";
import ProductQuery from "@/database/queries/products.gql";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Qirave - Products",
	description: "Qirave Saas Next App",
};

export default async function ProductsLayout({ children }: Readonly<React.PropsWithChildren>) {
	return (
		<PreloadQuery 
			query={ProductQuery} 
			variables={{ 
				limit: 20,
				offset: 0,
				orderBy: { 
					createdAt: { 
						direction: "desc",
						priority: 0 
					} 	
				}
			}}
		>
			<Suspense fallback={<>Suspense loading ....</>}>
				{children}
			</Suspense>
		</PreloadQuery>
	);
}