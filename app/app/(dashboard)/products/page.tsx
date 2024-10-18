'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, ListFilter, PlusCircle, List, Grid } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { useSuspenseQuery } from '@apollo/client';
import ProductsTable from '@/views/table/products';
import ProductsGrid from '@/views/grid/products';
import ProductsQuery from '@/database/queries/products.gql';
import { usePathname, useSearchParams } from 'next/navigation';
import NotFound from './not-found';
import { ProductsData } from '@/lib/types/data';

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useSuspenseQuery<ProductsData>(ProductsQuery, {
    variables: {
      limit: 20,
      offset: 0,
      orderBy: {
        createdAt: {
          direction: 'desc',
          priority: 0
        }
      }
    }
  });
  const [view, setView] = useState<View>(
    (searchParams.get('view') as View) || 'list'
  );

  console.table(data.products);

  const handleViewChange = (view: View) => {
    setView(view);
    router.replace(pathname + `?view=${view}`);
  };

  if (!data.products || data.products.length === 0) {
    return (
      <NotFound>
        <Button
          className="h-8 gap-1"
          onClick={() => router.push('/products/new')}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Create Product
        </Button>
      </NotFound>
    );
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="sticky flex items-center gap-2">
          <h3 className="text-primary text-lg font-semibold leading-none tracking-tight">
            Products
          </h3>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleViewChange('list')}
                    size="sm"
                    variant="outline"
                    className={`h-7 gap-1 ${view === 'list' && 'bg-muted-active-foreground'}`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">List view</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleViewChange('grid')}
                    size="sm"
                    variant="outline"
                    className={`h-7 gap-1 ${view === 'grid' && 'bg-muted-active-foreground'}`}
                  >
                    <Grid className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Grid view</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              size="sm"
              className="h-7 gap-1"
              onClick={() => router.push('/products/new')}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="overflow-hidden max-w-[93vw]">
          {view === 'list' ? (
            <ProductsTable products={data.products} />
          ) : (
            <ProductsGrid products={data.products} />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
