'use client';
import React from 'react';
import type { Product } from '@/database/schema/products';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  return (
    // grid section: 5 columns on large screens, 3 columns on medium screens, 2 columns on small screens
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-row items-center">
          <CardHeader>
            <Image
              src={product.image as string}
              alt={product.name}
              height={80}
              width={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </CardHeader>
          <CardContent className="w-80">
            <CardTitle>{product.name}</CardTitle>
            <div className="flex justify-between space-x-4">
              {/* <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar> */}
              <div className="space-y-1">
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
