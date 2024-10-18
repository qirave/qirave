'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Product } from '@/database/schema/products';
import ResizableTable from '@/components/data/ResizableTable';
import {
  ColumnDef,
  RowSelectionState,
  SortingState
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { ProductsData } from '@/lib/types/data';
import {
  PRODUCT_STATUSES_TAGS,
  ProductStatusType
} from '@/lib/data/productStatus';

const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    size: 40,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => (
      <Checkbox
        className="pl-0"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="pl-0"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    size: 80,
    enableResizing: false,
    cell: ({ row }) => (
      <Badge
        variant="outline"
        style={
          PRODUCT_STATUSES_TAGS[row.getValue('status') as ProductStatusType]
        }
      >
        {row.getValue('status')}
      </Badge>
    )
    // switch (row.getValue("status") as ProductStatusType) {
    //     case "active":
    //         return (
    //         <Badge
    //             variant="outline"
    //             // className="bg-green-700 border border-green-900 text-green-600"
    //             // background-color: rgb(156 255 199);
    //             // color: rgb(39 131 102);
    //             // border-color: rgb(52, 211, 153);
    //             style={{ backgroundColor: "#f0fff4", color: "#34d399", borderColor: "#34d399" }}
    //         >
    //             {row.getValue("status")}
    //         </Badge>
    //         )
    //     case "archived":
    //         return (<Badge variant="outline" className="bg-yellow-600">{row.getValue("status")}</Badge>)
    //     default:
    //         return (<Badge variant="outline" className="bg-muted-foreground" >{row.getValue("status")}</Badge>)
    // }
  },
  {
    id: 'image',
    header: 'Image',
    accessorKey: 'image',
    size: 80,
    enableResizing: false,
    enableSorting: false,
    cell: ({ row }) => (
      <Image
        src={row.getValue('image')}
        alt="Product Image"
        width={60}
        height={60}
        className="rounded-md aspect-square w-[80px]"
      />
    )
  },
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: true,
    maxSize: 300,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue('name')}</span>
  },
  {
    id: 'sku',
    header: 'SKU',
    accessorKey: 'sku',
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'tags',
    header: 'tags',
    accessorKey: 'tags',
    maxSize: 300,
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string;
      if (!tags) return null;
      return tags.split(',').map((tag) => (
        <Badge key={tag} className="bg-primary">
          {tag}
        </Badge>
      ));
    }
  },
  {
    id: 'price',
    header: 'Price',
    accessorKey: 'price'
  },
  {
    id: 'quantity',
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  }
];

export default function ProductsTable({ products }: ProductsData) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selected, setSelected] = React.useState<RowSelectionState>({});

  console.log('Selected', selected);
  console.log('Sorting', sorting);

  return (
    <Card className="w-full overflow-x-auto">
      <CardContent className={`w-full`}>
        <ResizableTable
          columns={columns}
          data={products}
          rowAction={(row) => {
            console.log('Row', row);
            router.push(`/products/${row.id}`);
          }}
          onSorting={[sorting, setSorting]}
          onRowSelection={[selected, setSelected]}
        />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
