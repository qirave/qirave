'use client';
import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import { TaxData } from '@/lib/types/data';
import { insertTaxSchema, NewTax, Tax } from '@/database/schema/tax';
import SettingTaxsQuery from '@/database/queries/settings/taxes.gql';
import SettingInsertIntoTaxSingle from '@/database/mutations/settings/InsertIntoTaxSingle.gql';
import { Label } from '@/components/ui/label';
import {
  TaxCalculation,
  TAXES_CALCULATION,
  TAXES_ON,
  TAXES_TYPES,
  TaxOn,
  TaxType
} from '@/lib/data/tax';
import { Edit3 } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultiSelect } from '@/components/data/multiselect';
import { Textarea } from '@/components/ui/textarea';
import { makeClient } from '@/lib/providers/apollo';
import { query } from '@/lib/providers/apollo.rsc';
import { Name } from 'drizzle-orm';

export default function SalesSettings() {
  const { data: taxData, error } = useSuspenseQuery<TaxData>(SettingTaxsQuery);
  const [addTax, { data: NewTax, loading, error: addTaxError }] = useMutation(
    SettingInsertIntoTaxSingle
  );
  const [taxes, setTaxes] = useState<Tax[]>(taxData.taxes || []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isLoading },
    setValue
  } = useForm({
    resolver: zodResolver(insertTaxSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      code: '',
      on: [...TAXES_ON] as unknown as string[],
      rate: 0,
      type: [...TAXES_TYPES][0] as unknown as string,
      description: '',
      calculation: [...TAXES_CALCULATION][0] as unknown as string
    }
  });

  const addNewTax = async (data: FieldValues) => {
    addTax({ variables: { values: data as NewTax } });

    console.log('Adding new tax', {
      NewTax,
      isSubmitSuccessful,
      loading,
      error: addTaxError
    });

    if (addTaxError) {
      console.error(addTaxError);
      return;
    }

    setDialogOpen(false);

    // setTaxes([...taxes, {
    // 	id: taxes.length+1,
    // 	name: data.name,
    // 	code: data.code,
    // 	on: data.on,
    // 	description: data.description,
    // 	rate: data.rate,
    // 	type: data.type,
    // 	calculation: data.calculation,
    // 	createdAt: new Date(),
    // 	updatedAt: new Date(),
    // }]);
  };

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Taxes</CardTitle>
        <CardDescription>
          Configuring taxes for sales and purchases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>On</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Calculation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxes.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell>{tax.name}</TableCell>
                    <TableCell>{tax.code}</TableCell>
                    <TableCell>
                      {[...tax.on].map((on) => (
                        <Badge
                          key={on.toString()}
                          variant="outline"
                          className={`mr-1 ${on === 'sales' ? 'bg-stone-200' : 'bg-teal-200'}`}
                        >
                          {on}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>{tax.rate}</TableCell>
                    <TableCell>{tax.type}</TableCell>
                    <TableCell>{tax.calculation}</TableCell>
                    {/* ACTIONS */}
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant={'ghost'}
                            size={'sm'}
                            className="w-10 hover:text-primary transition-colors"
                          >
                            <Edit3 />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Tax</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            Edit tax details.
                          </DialogDescription>
                          <form className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                placeholder="Tax Name"
                                defaultValue={tax.name}
                              />
                            </div>
                            <div className="grid items-center gap-4">
                              <Label htmlFor="code">Code</Label>
                              <Input
                                placeholder="Tax Code"
                                defaultValue={tax.code?.toString()}
                              />
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                              <div className="grid items-center gap-4">
                                <Label htmlFor="rate">Rate</Label>
                                <Input
                                  placeholder="Tax Rate"
                                  defaultValue={tax.rate}
                                />
                              </div>
                              <div className="grid items-center gap-4">
                                <Label htmlFor="type">Type</Label>
                                <Select defaultValue={tax.type}>
                                  <SelectTrigger id="type">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {TAXES_TYPES.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid items-center gap-4">
                              <Label htmlFor="calculation">Calculation</Label>
                              <Select defaultValue={tax.calculation}>
                                <SelectTrigger id="calculation">
                                  <SelectValue placeholder="Select Calculation" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TAXES_CALCULATION.map((calculation) => (
                                    <SelectItem
                                      key={calculation}
                                      value={calculation}
                                    >
                                      {calculation}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button>Save</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Suspense>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Dialog open={dialogOpen && !isSubmitSuccessful}>
          <DialogTrigger>
            <Button onClick={() => setDialogOpen(true)}>Add New Tax</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register New Tax</DialogTitle>
            </DialogHeader>
            <DialogDescription>Enter tax details.</DialogDescription>
            <form
              className="grid gap-4 py-4"
              onSubmit={handleSubmit(addNewTax)}
            >
              <div className="grid items-center gap-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Tax Name"
                  {...register('name')}
                  className={`${errors.name ? 'text-red-500 border-red-500' : ''}`}
                />
                <span
                  className={`text-red-500 text-xs ${errors.name ? 'block' : 'hidden'} transition-all`}
                >
                  {errors?.name?.message?.toString()}
                </span>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" placeholder="Tax Code" {...register('code')} />
                <span
                  className={`text-red-500 text-xs ${errors.code ? 'block' : 'hidden'}`}
                >
                  {errors?.code?.message?.toString()}
                </span>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="on">On</Label>
                <MultiSelect
                  defaultValues={[...TAXES_ON]}
                  options={[
                    {
                      value: 'sales',
                      label: 'Sales',
                      style: { backgroundColor: '#D1D5DB' }
                    },
                    {
                      value: 'purchase',
                      label: 'Purchase',
                      style: { backgroundColor: '#93C5FD' }
                    }
                  ]}
                  onSelect={(values) =>
                    setValue('on', values, { shouldValidate: true })
                  }
                />
              </div>

              <div className="grid items-center gap-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="rate">
                      Rate <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="rate"
                      placeholder="Tax Rate"
                      className={`${errors.rate ? 'text-red-500 border-red-500' : ''}`}
                      {...register('rate', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      defaultValue={TAXES_TYPES[0]}
                      onValueChange={(value) =>
                        setValue('type', value as TaxType, {
                          shouldValidate: true
                        })
                      }
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TAXES_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <span
                  className={`w-full text-red-500 text-xs ${errors.rate ? 'block' : 'hidden'}`}
                >
                  {errors?.rate?.message?.toString()}
                </span>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="calculation">Calculation</Label>
                <Select
                  defaultValue={TAXES_CALCULATION[0]}
                  onValueChange={(value) =>
                    setValue('calculation', value as TaxCalculation, {
                      shouldValidate: true
                    })
                  }
                >
                  <SelectTrigger id="calculation">
                    <SelectValue placeholder="Select Calculation" />
                  </SelectTrigger>
                  <SelectContent>
                    {TAXES_CALCULATION.map((calculation) => (
                      <SelectItem key={calculation} value={calculation}>
                        {calculation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tax description"
                  {...register('description')}
                />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
