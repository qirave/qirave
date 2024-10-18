'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import type { Product } from "@/database/schema/products";
import Image from 'next/image';
import { ChevronLeft, PlusCircle, Upload } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { NewProduct } from '@/database/schema/products';
import { Badge } from '@/components/ui/badge';
import UNITS, { UnitType } from '@/lib/data/units';
import INVOICE_POLICIES, { InvoicePolicyType } from '@/lib/data/invoicePolicy';
import { calculateTaxedPrice, generateRandomColor } from '@/lib/utils';
import { TagsType } from '@/lib/data/tags';
import InsertIntoProductsSingle from '@/database/queries/insertIntoProductsSingle.gql';
import TaxSelect from '@/components/data/TaxSelect';

export default function Page() {
  const router = useRouter();
  const [tags, setTags] = useState<TagsType[]>([]);
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    status: 'active',
    canSale: true,
    canPurchase: true,
    price: 0,
    cost: 0,
    description: '',
    saleUnitOfMesure: 'unit',
    purchaseUnitOfMesure: 'unit',
    invoicingPolicy: 'ordered quantities',
    supplier: '',
    barcode: '',
    sku: '',
    tags: '',
    image: '/imgs/product.bmp'
  });

  console.table({
    ...product,
    tags: tags.map((tag) => tag.name).join(',')
  });

  const handleCanSaleChange = () => {
    if (product.canSale) {
      // If disabling "sell", check if "purchase" should stay enabled
      setProduct((prev) => ({ ...prev, canSale: false }));
    } else {
      // Enable "sell", which may require adjusting "purchase"
      setProduct((prev) => ({
        ...prev,
        canSale: true,
        canPurchase: prev.canPurchase ? prev.canPurchase : false
      }));
    }
  };

  const handleCanPurchaseChange = () => {
    if (product.canPurchase) {
      // If disabling "purchase", check if "sell" should stay enabled
      setProduct((prev) => ({ ...prev, canPurchase: false }));
    } else {
      // Enable "purchase", which may require adjusting "sell"
      setProduct((prev) => ({
        ...prev,
        canPurchase: true,
        canSale: prev.canSale ? prev.canSale : false
      }));
    }
  };

  // handle form reset
  const handleReset = () => {
    setProduct({
      name: '',
      status: 'active',
      canSale: true,
      canPurchase: true,
      price: 0,
      cost: 0,
      description: '',
      saleUnitOfMesure: 'unit',
      purchaseUnitOfMesure: 'unit',
      invoicingPolicy: 'ordered quantities',
      supplier: '',
      barcode: '',
      sku: '',
      tags: '',
      image: '/imgs/product.bmp'
    });
    router.back();
  };

  return (
    <main className="w-full grid flex-1 auto-rows-max gap-4 p-4 sm:px-6 sm:py-0">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => router.back()}
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {product?.name || 'New Product'}
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0 capitalize">
          {product?.status}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button
            type="reset"
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            Discard
          </Button>
          <Button size="sm" type="submit">
            Save Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                <Input
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  className="w-full text-2xl text-primary font-semibold p-0 border rounded-none border-t-0 border-l-0 border-r-0 border-primary focus-visible:text-foreground focus-visible:border-primary focus-visible:border-b-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-primary focus-visible:ring-b-2"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </CardTitle>
              <div className="grid gap-6 pt-4 text-foreground">
                <div className="flex gap-4">
                  <div className="w-fit flex gap-2 justify-center items-center">
                    <Checkbox
                      id="canSale"
                      checked={!!product.canSale}
                      onCheckedChange={handleCanSaleChange}
                    />
                    <Label
                      htmlFor="canSale"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sales
                    </Label>
                  </div>
                  <div className="w-fit flex gap-2 justify-center items-center">
                    <Checkbox
                      id="canPurchase"
                      checked={!!product.canPurchase}
                      onCheckedChange={handleCanPurchaseChange}
                    />
                    <Label
                      htmlFor="canPurchase"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Purchase
                    </Label>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm text-muted-foreground mt-2">
                Chose the product status and invoicing policy
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]"></TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[170px]">Tax</TableHead>
                      <TableHead className="w-[100px]">Per</TableHead>
                      <TableHead className="w-[100px]">Taxed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow hidden={!product.canSale}>
                      <TableCell>
                        <Label
                          htmlFor="price"
                          className="font-semibold text-right"
                        >
                          Sales
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Input
                          id="price"
                          type="number"
                          min={0}
                          className="w-full"
                          defaultValue={product.price}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              price: e.target.value
                                ? parseFloat(e.target.value)
                                : 0
                            })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        {/* <Select value={product?.salesTaxId?.toString()} onValueChange={(value: string) => setProduct({ ...product, salesTaxId: parseInt(value) })}>
                                                    <SelectTrigger id="tax" aria-label="Tax">
                                                        <SelectValue placeholder="Select Tax" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        { taxData.taxes.filter((tax) => tax?.on?.includes("sales")).map((tax) => (
                                                            <SelectItem key={tax.id} value={tax.id.toString()} className="flex px-0 py-1 items-center justify-center">
                                                                <Badge variant="outline" className="w-full px-4 py-1 bg-stone-200">{tax.name} {tax.type === "percentage" ? `${tax.rate}%` : `${tax.rate}`}</Badge>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select> */}
                        <TaxSelect
                          on={['sales']}
                          onTaxIDChange={(id) =>
                            setProduct({ ...product, taxId: id })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <div className="w-24">
                          <Select
                            value={product.saleUnitOfMesure}
                            onValueChange={(value: UnitType) =>
                              setProduct({
                                ...product,
                                saleUnitOfMesure: value
                              })
                            }
                          >
                            <SelectTrigger
                              id="saleUnitOfMesure"
                              aria-label="Mesure Unit"
                            >
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {UNITS.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>

                      {/* <TableCell>
                                                <span className="text-primary font-semibold"> = {calculateTaxedPrice(product.price, taxData.taxes.find(tax => tax.id === product.salesTaxId) ?? { name: "", type: "fixed", id: 0, code: null, description: null, createdAt: null, updatedAt: null, on: "", rate: 0 })}</span>
                                            </TableCell> */}
                    </TableRow>
                    <TableRow hidden={!product.canPurchase}>
                      <TableCell>
                        <Label
                          htmlFor="cost"
                          className="font-semibold text-right"
                        >
                          Purchase
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Input
                          id="cost"
                          type="number"
                          min={0}
                          className="w-full"
                          defaultValue={product.cost}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              cost: e.target.value
                                ? parseFloat(e.target.value)
                                : 0
                            })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <TaxSelect
                          on={['purchase']}
                          onTaxIDChange={(id) =>
                            setProduct({ ...product, taxId: id })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <div className="w-24">
                          <Select
                            value={product.purchaseUnitOfMesure}
                            onValueChange={(value: UnitType) =>
                              setProduct({
                                ...product,
                                purchaseUnitOfMesure: value
                              })
                            }
                          >
                            <SelectTrigger
                              id="saleUnitOfMesure"
                              aria-label="Mesure Unit"
                            >
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {UNITS.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>

                      {/* <TableCell>
                                                <span className="text-primary font-semibold"> = {calculateTaxedPrice(product.cost || 0, taxes.find(tax => tax.id === product.purchaseTaxId) ?? { name: "", type: "fixed", id: 0, code: null, description: null, createdAt: null, updatedAt: null, on: "", rate: 0 })}</span>
                                            </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  type="text"
                  placeholder="e.g. GGPC-001"
                  onChange={(e) =>
                    setProduct({ ...product, sku: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  type="text"
                  placeholder="e.g. 1234567890"
                  onChange={(e) =>
                    setProduct({ ...product, barcode: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  type="text"
                  placeholder="e.g. John Doe"
                  onChange={(e) =>
                    setProduct({ ...product, supplier: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="invoicePolicy">Invoice Policy</Label>
                <Select
                  value={product.invoicingPolicy}
                  onValueChange={(value: InvoicePolicyType) =>
                    setProduct({ ...product, invoicingPolicy: value })
                  }
                >
                  <SelectTrigger id="invoicePolicy" aria-label="Invoice Policy">
                    <SelectValue placeholder="Select invoice policy" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVOICE_POLICIES.map((policy) => (
                      <SelectItem key={policy} value={policy}>
                        {policy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="Tags"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      // render badges with random colors
                      const randomColor = generateRandomColor();
                      // filter the duplicates
                      const tagsSet = new Set(tags.map((t) => t.name));
                      if (!tagsSet.has(e.currentTarget.value)) {
                        setTags([
                          ...tags,
                          {
                            name: e.currentTarget.value,
                            bg: randomColor.backgroundColor,
                            color: randomColor.textColor
                          }
                        ]);
                      }
                      // setTags([...tags, { name: e.currentTarget.value, bg: randomColor.backgroundColor, color: randomColor.textColor }]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <div className="h-fit flex gap-2">
                  {tags &&
                    tags.map((tag, i) => {
                      return (
                        <Badge
                          key={i}
                          variant="outline"
                          style={{ backgroundColor: tag.bg, color: tag.color }}
                          className={`cursor-pointer`}
                          onClick={() => {
                            setTags(
                              tags.filter(
                                (t) =>
                                  t.name !== tag.name &&
                                  t.bg !== tag.bg &&
                                  t.color !== tag.color
                              )
                            );
                          }}
                        >
                          {tag.name}
                        </Badge>
                      );
                    })}
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description"
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  className="min-h-32"
                />
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
              <CardTitle>Stock</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">SKU</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-[100px]">Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">GGPC-001</TableCell>
                    <TableCell>
                      <Label htmlFor="stock-1" className="sr-only">
                        Stock
                      </Label>
                      <Input id="stock-1" type="number" defaultValue="100" />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor="price-1" className="sr-only">
                        Price
                      </Label>
                      <Input id="price-1" type="number" defaultValue="99.99" />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="s"
                        variant="outline"
                      >
                        <ToggleGroupItem value="s">S</ToggleGroupItem>
                        <ToggleGroupItem value="m">M</ToggleGroupItem>
                        <ToggleGroupItem value="l">L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">GGPC-002</TableCell>
                    <TableCell>
                      <Label htmlFor="stock-2" className="sr-only">
                        Stock
                      </Label>
                      <Input id="stock-2" type="number" defaultValue="143" />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor="price-2" className="sr-only">
                        Price
                      </Label>
                      <Input id="price-2" type="number" defaultValue="99.99" />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="m"
                        variant="outline"
                      >
                        <ToggleGroupItem value="s">S</ToggleGroupItem>
                        <ToggleGroupItem value="m">M</ToggleGroupItem>
                        <ToggleGroupItem value="l">L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">GGPC-003</TableCell>
                    <TableCell>
                      <Label htmlFor="stock-3" className="sr-only">
                        Stock
                      </Label>
                      <Input id="stock-3" type="number" defaultValue="32" />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor="price-3" className="sr-only">
                        Stock
                      </Label>
                      <Input id="price-3" type="number" defaultValue="99.99" />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="s"
                        variant="outline"
                      >
                        <ToggleGroupItem value="s">S</ToggleGroupItem>
                        <ToggleGroupItem value="m">M</ToggleGroupItem>
                        <ToggleGroupItem value="l">L</ToggleGroupItem>
                      </ToggleGroup>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
              <Button type="button" size="sm" variant="ghost" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Add Variant
              </Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">Subcategory (optional)</Label>
                  <Select>
                    <SelectTrigger
                      id="subcategory"
                      aria-label="Select subcategory"
                    >
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t-shirts">T-Shirts</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  src={product.image || '/imgs/product.bmp'}
                  width="300"
                />
                <div className="grid grid-cols-3 gap-2">
                  <button>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src={product.image || '/imgs/product.bmp'}
                      width="84"
                    />
                  </button>
                  <button>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src={product.image || '/imgs/product.bmp'}
                      width="84"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-amber-400 bg-amber-50 bg-opacity-50">
            <CardHeader>
              <CardTitle className="text-amber-600">Archive Product</CardTitle>
              <CardDescription className="text-amber-700">
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="bg-amber-200 hover:bg-amber-600 text-amber-900 hover:text-amber-100"
              >
                Archive Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button type="button" variant="outline" size="sm">
          Discard
        </Button>
        <Button type="button" size="sm">
          Save Product
        </Button>
      </div>
    </main>
  );
}
